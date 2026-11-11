# Apuntes Completos de Preparación: Redes y Entrega de Contenido en AWS (Tema 5)

## 1\. Fundamentos de Redes y Modelo OSI

El diseño de arquitecturas en la nube pública se sustenta sobre los estándares tradicionales de redes de comunicaciones. Comprender la correspondencia entre los modelos de referencia, los esquemas de direccionamiento y los protocolos de transporte resulta indispensable para configurar adecuadamente la infraestructura de red en Amazon Web Services (AWS).

### 1.1 El Modelo de Interconexión de Sistemas Abiertos (OSI)

El modelo OSI estructura la comunicación entre sistemas en siete capas funcionales diferenciadas. Cada capa resuelve una etapa concreta en la transmisión, procesamiento y entrega de los paquetes de datos entre los equipos emisor y receptor:

| Capa                | Número | Función Principal                                                                                                                                                       | Protocolos y Unidades de Datos                             |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Aplicación**      | 7      | Proporciona la interfaz directa para que las aplicaciones de usuario accedan a los servicios de red.                                                                    | HTTP, HTTPS, FTP, DHCP, LDAP                               |
| **Presentación**    | 6      | Garantiza la legibilidad de la información entre sistemas heterogéneos y gestiona el cifrado y la codificación de datos.                                                | ASCII, ICA, formatos de cifrado                            |
| **Sesión**          | 5      | Establece, administra, coordina y finaliza los intercambios de datos y sesiones continuas entre aplicaciones.                                                           | NetBIOS, RPC                                               |
| **Transporte**      | 4      | Proporciona mecanismos de extremo a extremo para la comunicación de host a host con control de flujo y multiplexación.                                                  | TCP (orientado a conexión) y UDP (no orientado a conexión) |
| **Red**             | 3      | Gestiona el direccionamiento lógico, el enrutamiento y el reenvío de paquetes entre redes a través de enrutadores.                                                      | Protocolo de Internet (IP)                                 |
| **Enlace de datos** | 2      | Controla la transferencia física de tramas dentro del mismo segmento local (LAN) mediante conmutadores (*switches*) y concentradores (*hubs*).                          | Direccionamiento MAC, tramas Ethernet                      |
| **Física**          | 1      | Transmite y recibe flujos de bits binarios sin procesar (1 y 0) a través de los medios físicos de transmisión mediante señales eléctricas, ópticas o electromagnéticas. | Cables, transceptores, señales                             |

### 1.2 Direccionamiento IP y Notación CIDR

Las redes TCP/IP requieren un esquema de direccionamiento unívoco para identificar a cada dispositivo participante:

* **IPv4 (32 bits):** Formada por cuatro octetos separados por puntos (por ejemplo, `192.0.2.0`), lo que proporciona un espacio teórico de aproximadamente $4.29 \\times 10^9$ direcciones.
* **IPv6 (128 bits):** Diseñada para superar el agotamiento de direcciones de IPv4, estructurada en ocho grupos hexadecimales de 16 bits separados por dos puntos (por ejemplo, `2600:1f18:22ba:8c00:ba86:a05e:a5ba:00FF`).

El estándar de **Enrutamiento entre Dominios sin Clases (CIDR)** sustituye la división rígida por clases mediante una máscara de subred variable expresada con la barra diagonal `/`. En una notación como `192.0.2.0/24`:

* El valor numérico tras la barra (`/24`) indica la cantidad de **bits fijos** que componen el identificador de red (prefijo de enrutamiento).
* Los bits restantes ($32 - 24 = 8$ bits) representan la parte flexible reservada para los **identificadores de host**, permitiendo asignar desde `00000000` hasta `11111111` ($2^8 = 256$ combinaciones posibles).

### 1.3 Direcciones IP Reservadas por AWS en cada Subred

En el diseño tradicional de redes locales, se reservan dos direcciones IP por subred: la primera para identificar la red y la última para la dirección de difusión (*broadcast*). En Amazon VPC, **AWS reserva obligatoriamente 5 direcciones IP** en cada bloque de subred, independientemente de su tamaño:

| Dirección IP (Ejemplo bloque `10.0.0.0/24`) | Propósito de la Reserva en AWS                                                                  |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **`10.0.0.0`**                              | Dirección de red de la subred (no asignable a instancias).                                      |
| **`10.0.0.1`**                              | Reservada por AWS para el enrutador predeterminado de la VPC (comunicaciones internas).         |
| **`10.0.0.2`**                              | Reservada por AWS para el solucionador de nombres DNS de la VPC (AmazonProvidedDNS).            |
| **`10.0.0.3`**                              | Reservada por AWS para usos y funciones futuras.                                                |
| **`10.0.0.255`**                            | Dirección de difusión de red (*broadcast*), reservada aunque AWS no soporte difusión en la VPC. |

&gt; **Cálculo de direcciones útiles para examen:** Si una subred cuenta con un bloque CIDR `/24` (256 direcciones totales), la cantidad real de direcciones utilizables para instancias y recursos es de **251 direcciones IP** ($256 - 5 = 251$). Si el bloque asignado es `/28` (16 direcciones totales), el número de direcciones útiles se reduce a **11 direcciones IP** ($16 - 5 = 11$).

---

## 2\. Arquitectura Central de Amazon VPC

Amazon Virtual Private Cloud (Amazon VPC) es el servicio fundamental que permite aprovisionar una sección aislada de forma lógica dentro de la nube de AWS, brindando un control exhaustivo sobre el entorno de red virtual.

### 2.1 Propiedades y Límites Estructurales de la VPC

* **Ámbito geográfico:** Una VPC pertenece a una **única región de AWS** y no puede extenderse entre regiones directamente.
* **Bloque de CIDR:** Al aprovisionar una VPC, se define un bloque CIDR IPv4 primario perteneciente al rango privado (RFC 1918, tales como `10.0.0.0/16`). Este bloque define el límite de direccionamiento de la red y **no se puede modificar una vez creada la VPC**.
* **Límites de tamaño admitidos:**  
  * Tamaño máximo: Bloque **/16** (proporciona hasta 65.536 direcciones IP).
  * Tamaño mínimo: Bloque **/28** (proporciona 16 direcciones IP brutas).

### 2.2 Subredes y Zonas de Disponibilidad

Una VPC se subdivide internamente en una o más subredes para segmentar el tráfico, aislar cargas de trabajo y organizar los recursos:

* Cada subred reside de forma estricta y exclusiva dentro de una **única Zona de Disponibilidad (AZ)** de la región seleccionada.
* Los bloques CIDR de las distintas subredes configuradas dentro de una misma VPC **nunca deben solaparse**.
* Para lograr arquitecturas con alta disponibilidad y tolerancia a fallos, se deben desplegar subredes paralelas distribuidas en dos o más Zonas de Disponibilidad dentro de la misma región.

### 2.3 Tablas de Enrutamiento (Route Tables)

Una tabla de enrutamiento contiene un conjunto ordenado de reglas (denominadas rutas) que determinan hacia dónde se dirige el tráfico que sale de las subredes:

* **Asociación única:** Cada subred de la VPC debe estar asociada obligatoriamente a una tabla de enrutamiento (y únicamente a una a la vez). Si no se le asocia una tabla de forma explícita, la subred queda vinculada automáticamente a la **tabla de enrutamiento principal (predeterminada)** de la VPC.
* **Estructura de una ruta:** Toda regla de enrutamiento está compuesta por un **Destino** (el bloque CIDR al que se quiere enviar el tráfico) y un **Objetivo** (el dispositivo, gateway o interfaz que procesa el paquete).
* **Ruta local inamovible:** Toda tabla de enrutamiento creada en una VPC incorpora una ruta local integrada donde el Destino es el bloque CIDR completo de la VPC (ej. `10.0.0.0/16`) y el Objetivo es `local`. Esta ruta permite la comunicación interna entre todas las subredes de la VPC y **no se puede modificar ni eliminar bajo ninguna circunstancia**.

---

## 3\. Conectividad de Red y Puertas de Enlace

El aislamiento inicial de una VPC exige incorporar componentes especializados cuando los recursos necesitan interactuar con Internet, con redes locales corporativas o con otras VPCs.

### 3.1 Puerta de Enlace de Internet (Internet Gateway - IGW)

El Internet Gateway es un componente de software administrado por AWS, horizontalmente escalable, redundante y de alta disponibilidad, que permite la comunicación bidireccional entre las instancias de la VPC e Internet:

* Se asocia en una relación de uno a uno con la VPC.
* Permite definir una **subred pública**: para que una subred sea considerada pública, su tabla de enrutamiento debe contener una ruta predeterminada con destino `0.0.0.0/0` (todo el tráfico IPv4) cuyo objetivo sea el identificador del gateway (`igw-id`).
* Realiza la traducción de direcciones de red (NAT) entre la dirección IP privada de la instancia y su dirección IP pública asignada.

### 3.2 Puerta de Enlace NAT (NAT Gateway)

Cuando se diseñan entornos seguros multicapa, los servidores de bases de datos o backend deben ubicarse en **subredes privadas** (subredes cuya tabla de enrutamiento no tiene ruta directa hacia un `igw-id`). Sin embargo, estas cargas requieren descargar periódicamente actualizaciones y parches de seguridad de Internet.

El **NAT Gateway** resuelve este desafío garantizando un flujo unidireccional:

* Permite que las instancias en subredes privadas inicien conexiones salientes hacia Internet.
* **Bloquea e impide terminantemente que clientes o atacantes en Internet inicien conexiones directas** hacia las instancias privadas.
* **Ubicación y requisitos obligatorios:**  
  1. El NAT Gateway debe implementarse en una **subred pública**.
  2. Debe asignársele una **dirección IP elástica (Elastic IP)** pública estática.
  3. En la tabla de enrutamiento de la subred privada, se debe configurar una ruta con destino `0.0.0.0/0` apuntando al identificador del NAT Gateway (`nat-gw-id`).

### 3.3 Conectividad Inter-VPC: VPC Peering y Transit Gateway

Cuando múltiples VPCs necesitan compartir datos de manera privada, AWS ofrece dos modelos de interconexión:

#### Interconexión de VPC (VPC Peering)

* Establece una conexión punto a punto directa entre dos VPCs (identificada como `pcx-id`), permitiendo que se comuniquen utilizando direcciones IPv4 o IPv6 privadas.
* Puede implementarse entre VPCs de la misma cuenta, de cuentas distintas o entre regiones diferentes (*Inter-Region VPC Peering*).
* **Restricción de no transitividad:** El VPC Peering **no admite enrutamiento transitivo**. Si la VPC A está emparejada con la VPC B, y la VPC B está emparejada con la VPC C, la VPC A no puede enviar tráfico hacia la VPC C a través de la VPC B. Cada relación debe establecerse de forma directa y explícita.
* Los bloques CIDR de las dos VPC emparejadas no pueden solaparse.

#### AWS Transit Gateway

* Actúa como un concentrador central de red estructurado bajo una topología de tipo estrella (*hub-and-spoke*).
* Permite conectar decenas o cientos de VPCs, conexiones VPN y enlaces de AWS Direct Connect a una única pasarela centralizada.
* Resuelve la complejidad operativa y el crecimiento inmanejable de las mallas completas (*full-mesh*) generadas por múltiples interconexiones punto a punto de VPC Peering.

### 3.4 Conectividad Híbrida: Site-to-Site VPN y Direct Connect

Para integrar centros de datos locales (*on-premises*) con la VPC existen dos alternativas arquitectónicas:

* **AWS Site-to-Site VPN:** Crea un túnel cifrado IPsec a través de la red pública de Internet. Requiere una **Puerta de Enlace Virtual (Virtual Private Gateway - VGW)** asociada a la VPC y una **Puerta de Enlace de Cliente (Customer Gateway - CGW)** en el centro de datos físico. La tabla de enrutamiento de la VPC debe dirigir el tráfico con destino a la red local hacia el `vgw-id`.
* **AWS Direct Connect:** Establece un enlace de red físico y dedicado entre las instalaciones locales y AWS mediante conexiones basadas en **VLAN 802.1q**, omitiendo por completo el tránsito a través de la red pública de Internet para conseguir un rendimiento predecible y una latencia reducida.

---

## 4\. Seguridad en Capas: Grupos de Seguridad frente a ACL de Red

AWS implementa el principio de defensa en profundidad mediante dos mecanismos de filtrado de tráfico complementarios que operan en diferentes niveles de la topología de red.

### 4.1 Matriz Comparativa Exhaustiva

| Parámetro de Diseño                       | Grupo de Seguridad (Security Group)                                                                                                               | Lista de Control de Acceso (Network ACL)                                                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Nivel de actuación**                    | **Nivel de instancia** / Interfaz de red elástica (ENI).                                                                                          | **Nivel de subred** (primera barrera de entrada y salida).                                                                                                   |
| **Gestión de estado**                     | **Con estado (*Stateful*):** Si se autoriza una petición entrante, la respuesta saliente se permite de forma automática e inmediata, y viceversa. | **Sin estado (*Stateless*):** El tráfico de ida y el de vuelta se gestionan por separado; se deben autorizar explícitamente ambas direcciones en las reglas. |
| **Tipos de reglas**                       | **Únicamente reglas de permiso.** No es posible crear reglas de denegación explícitas (todo lo no permitido se bloquea).                          | Admite **reglas de permiso y reglas de denegación** explícitas.                                                                                              |
| **Evaluación de reglas**                  | Se evalúan **todas las reglas de forma global** antes de tomar la decisión de autorizar el tráfico.                                               | Se evalúan en **estricto orden numérico incremental**; la primera regla que coincida con el paquete determina la acción.                                     |
| **Comportamiento por defecto (creación)** | Deniega todo el tráfico entrante y **permite todo el tráfico saliente** (`0.0.0.0/0` e `::/0`). Incluye regla entrante autorreferenciada.         | Las ACL **personalizadas deniegan todo el tráfico** entrante y saliente hasta que se agregan reglas manualmente.                                             |

### 4.2 Configuración Práctica de Grupos de Seguridad

Un grupo de seguridad actúa como un cortafuegos virtual para las instancias EC2:

* **Regla autorreferenciada:** En el grupo predeterminado se incluye una regla de entrada donde el origen es el propio ID del grupo de seguridad (`sg-xxxxxxxx`), lo que permite que todas las instancias que compartan dicho grupo se comuniquen entre sí en todos los puertos.
* **Reglas web estándar:** Para habilitar un servidor web, se configuran reglas entrantes para TCP puerto 80 (HTTP) y TCP puerto 443 (HTTPS) con origen `0.0.0.0/0`.
* **Reglas de administración SSH:** Para administrar instancias Linux, se añade una regla entrante para el protocolo TCP en el **puerto 22 (SSH)**. Por recomendación de seguridad, el origen no debe ser abierto a todo el mundo, sino restringido al rango CIDR público específico de la red corporativa o IP de administración.
* **Reglas para bases de datos:** Para permitir que un servidor web acceda a una base de datos Microsoft SQL Server, se añade una regla en el grupo de seguridad de la base de datos que autoriza el protocolo TCP en el **puerto 1433**, estableciendo como origen el ID del grupo de seguridad del servidor web.

### 4.3 Comportamiento de las ACL de Red (Predeterminada vs. Personalizada)

* **ACL de Red Predeterminada:** Asociada automáticamente a las subredes creadas en la VPC. Viene configurada con la regla número `100` que permite todo el tráfico IPv4 (`0.0.0.0/0`) tanto de entrada como de salida, seguida de la regla asterisco (`*`) que deniega cualquier paquete que no haya coincidido previamente.
* **ACL de Red Personalizada:** Cuando se crea una nueva ACL de red, esta contiene inicialmente únicamente la regla asterisco (`*`) para entrada y salida. Por tanto, bloquea por defecto absolutamente todo el tráfico de la subred hasta que el administrador define reglas numeradas explícitas (por ejemplo, regla 100 para HTTPS puerto 443 y regla 120 para SSH puerto 22 desde `192.0.2.0/24`).

---

## 5\. Amazon Route 53: DNS y Políticas de Enrutamiento

Amazon Route 53 es un servicio web de Sistema de Nombres de Dominio (DNS) en la nube altamente disponible y escalable, diseñado para traducir nombres legibles para personas (como `www.example.com`) en direcciones IP numéricas (como `192.0.2.1`).

### 5.1 Capacidades Principales

* Soporte nativo y completo para direccionamiento **IPv4 e IPv6**.
* Conexión fluida de peticiones de usuario hacia infraestructura interna de AWS (instancias EC2, balanceadores ELB, buckets S3) y también hacia servidores externos a AWS.
* **Registro de dominios:** Permite adquirir y administrar nombres de dominio directamente desde la consola.
* **Comprobaciones de estado (*Health Checks*):** Monitoriza el estado funcional de las aplicaciones y recursos web. Configura intervalos de comprobación estándar (cada 30 segundos) o rápidos (cada 10 segundos), con un umbral de fallo predeterminado de 3 intentos fallidos consecutivos antes de marcar un recurso como fuera de servicio. Admite coincidencia de cadenas (*string matching*), gráficos de latencia e inversión de estado.

### 5.2 Políticas de Enrutamiento Disponibles

Route 53 soporta diversas estrategias para determinar cómo se resuelven las consultas DNS de los clientes:

1. **Enrutamiento Simple (*Simple Routing*):** Adecuado para configuraciones básicas con un único recurso o servidor para el dominio.
2. **Enrutamiento Ponderado (*Weighted Round Robin*):** Asigna ponderaciones numéricas a conjuntos de registros para repartir el porcentaje de peticiones entre diferentes servidores o entornos de prueba.
3. **Enrutamiento por Latencia (*Latency-based Routing*):** Dirige la solicitud hacia la región de AWS que ofrezca el menor tiempo de respuesta de red para el usuario solicitante.
4. **Enrutamiento por Geolocalización (*Geolocation Routing*):** Enruta el tráfico en función de la ubicación geográfica de los usuarios finales (por continente, país o estado).
5. **Enrutamiento por Geoproximidad (*Geoproximity Routing*):** Dirige las solicitudes basándose en la proximidad física hacia los recursos de AWS, permitiendo modificar los límites de influencia mediante un sesgo (*bias*).
6. **Enrutamiento por Conmutación por Error (*Failover Routing*):** Utiliza comprobaciones de estado para implementar arquitecturas de alta disponibilidad activas/pasivas. Si el recurso primario (por ejemplo, un balanceador ELB o servidor EC2) falla, el tráfico se redirige automáticamente al recurso secundario de respaldo (como un sitio web estático alojado en un bucket de Amazon S3).
7. **Enrutamiento de Respuesta con Varios Valores (*Multi-value Answer Routing*):** Responde a las consultas DNS devolviendo hasta ocho registros de recursos en buen estado seleccionados al azar, ofreciendo una capa básica de balanceo de carga en capa DNS.

---

## 6\. Amazon CloudFront y Entrega de Contenido

Amazon CloudFront es el servicio de Red de Entrega de Contenido (CDN) global, seguro y de alta velocidad de AWS, diseñado para optimizar el rendimiento y reducir la latencia en la distribución de páginas web, archivos multimedia, APIs y contenido en streaming.

### 6.1 Infraestructura Global de Caché

CloudFront interpone una red de servidores de almacenamiento en caché entre los usuarios finales y los servidores de origen:

* **Ubicaciones Perimetrales (*Edge Locations*):** Red mundial de centros de datos situados en grandes urbes que mantienen copias en caché del contenido solicitado con mayor frecuencia, respondiendo localmente a las peticiones con latencias mínimas.
* **Cachés Perimetrales Regionales (*Regional Edge Caches*):** Capa intermedia de servidores de caché que se ubican geográficamente entre el servidor de origen (por ejemplo, un bucket de Amazon S3 o una instancia EC2) y las ubicaciones perimetrales locales. Almacenan contenido menos popular para evitar consultas innecesarias y costosas al servidor de origen.

### 6.2 Modelo de Costes y Facturación de CloudFront

El esquema de precios se basa en el modelo de pago por uso según cuatro componentes principales:

* **Transferencia de datos saliente:** Se tarifica el volumen de datos en gigabytes transferidos hacia Internet desde las ubicaciones perimetrales o hacia el servidor de origen.
* **Solicitudes HTTP y HTTPS:** Se aplica un coste por el número total de solicitudes tramitadas por el servicio.
* **Solicitudes de invalidación de caché:** Permite purgar archivos cacheados antes de su expiración por TTL. Las primeras **1.000 rutas solicitadas cada mes son gratuitas**; a partir de dicha cuota, cada ruta adicional tiene un coste de **0,005 USD**.
* **Certificado SSL personalizado con IP dedicada:** Para distribuciones que requieren compatibilidad con clientes antiguos mediante direcciones IP dedicadas para certificados SSL personalizados, se aplica una tarifa fija de **600 USD mensuales** por certificado.

---

## 7\. Desglose del Laboratorio 2: Creación de VPC e Inicio de un Servidor Web

El Laboratorio 2 reúne de forma práctica los conceptos de conectividad, segmentación y seguridad del Módulo 5.

### 7.1 Arquitectura del Laboratorio

El objetivo consiste en desplegar una VPC personalizada redundante distribuida en dos Zonas de Disponibilidad (AZ A y AZ B):

* **Bloque CIDR de la VPC:** `10.0.0.0/16`.
* **Subredes configuradas:**  
  * **AZ A:** Subred pública 1 (`10.0.0.0/24`) y Subred privada 1 (`10.0.1.0/24`).
  * **AZ B:** Subred pública 2 (`10.0.2.0/24`) y Subred privada 2 (`10.0.3.0/24`).
* **Componentes de red desplegados:**  
  * Un **Internet Gateway** asociado a la VPC.
  * Una tabla de enrutamiento pública con la ruta `0.0.0.0/0` apuntando al `igw-id`, asociada a las subredes públicas.
  * Un **NAT Gateway** desplegado en la subred pública 1 (AZ A) con IP elástica.
  * Una tabla de enrutamiento privada con la ruta `0.0.0.0/0` dirigida al `nat-gw-id`, asociada a las subredes privadas.

### 7.2 Procedimiento de Despliegue y Pruebas

1. **Creación de la VPC y Subredes:** Configuración manual de la VPC `10.0.0.0/16` y particionamiento en cuatro bloques `/24`.
2. **Configuración de Enrutamiento e Internet Gateway:** Creación del IGW, acoplamiento a la VPC y adición de la ruta por defecto en la tabla de rutas pública.
3. **Grupo de Seguridad del Servidor Web:** Creación de un grupo de seguridad personalizado para la VPC con las siguientes reglas entrantes:  
  * **HTTP (puerto 80):** Origen `0.0.0.0/0` para autorizar visitas públicas al sitio web.
  * **SSH (puerto 22):** Origen limitado a la IP de administración para gestionar la consola del sistema operativo.
4. **Lanzamiento de Instancia Amazon EC2:** Despliegue de una instancia Linux en la **subred pública 2**, activando la asignación automática de IP pública y vinculando el grupo de seguridad web creado.
5. **Verificación Funcional:** Comprobación del acceso al servidor web introduciendo la dirección IP pública de la instancia EC2 en el navegador web a través del protocolo HTTP.

---

## 8\. Glosario Rápido de Conceptos Clave para Examen

* **Amazon VPC:** Red virtual lógicamente aislada de alcance regional para alojar recursos en AWS.
* **CIDR:** Especificación de direccionamiento IP que define prefijos de red mediante una notación de longitud de máscara de subred.
* **Subred Pública:** Subred cuya tabla de enrutamiento contiene una regla directa hacia un Internet Gateway (`0.0.0.0/0 -&gt; igw-id`).
* **Subred Privada:** Subred sin ruta directa hacia el Internet Gateway, requiriendo un NAT Gateway para salidas a Internet.
* **Internet Gateway (IGW):** Puerta de enlace bidireccional y de alta disponibilidad que conecta la VPC con Internet y realiza NAT para IPs públicas.
* **NAT Gateway:** Dispositivo unidireccional situado en subred pública que permite salida a Internet a instancias privadas bloqueando accesos entrantes.
* **Grupo de Seguridad:** Firewall virtual con estado (*stateful*) que filtra tráfico a nivel de instancia y solo admite reglas de permiso.
* **ACL de Red (NACL):** Firewall virtual sin estado (*stateless*) a nivel de subred que evalúa reglas de permiso y denegación en orden numérico.
* **VPC Peering:** Conexión directa no transitiva entre dos VPCs para intercambiar tráfico sobre direccionamiento IP privado.
* **AWS Transit Gateway:** Concentrador centralizado en estrella (*hub-and-spoke*) que interconecta múltiples VPCs, redes VPN y Direct Connect.
* **Amazon Route 53:** Servicio DNS gestionado y escalable con comprobaciones de estado y múltiples políticas de enrutamiento inteligente.
* **Amazon CloudFront:** CDN distribuida a nivel global que utiliza ubicaciones perimetrales para servir contenido con baja latencia.