# TEMA 4 — SEGURIDAD EN AWS

---

## 1. El Modelo de Responsabilidad Compartida

La seguridad en AWS se rige por una división estricta de tareas entre el proveedor (AWS) y el cliente, diferenciando la **seguridad «DE» la nube** de la **seguridad «EN» la nube**.

### Seguridad «DE» la nube (Responsabilidad de AWS)
AWS es responsable de proteger y gestionar toda la infraestructura física y lógica subyacente que sustenta los servicios en la nube:
* **Infraestructura global de hardware:** Regiones geográficas, Zonas de Disponibilidad (AZ) y Ubicaciones de Borde (*Edge Locations*).
* **Seguridad física:** Protección perimetral de los centros de datos, videovigilancia y acceso físico estrictamente controlado y justificado.
* **Capa de virtualización y hardware:** Servidores físicos, almacenamiento, mantenimiento y destrucción o desmagnetización segura de medios de almacenamiento dados de baja.
* **Red e hipervisor:** Mantenimiento de routers, switches, detección de intrusiones en la red troncal de AWS, parches del sistema operativo del host y aislamiento estricto entre instancias de distintos clientes.
* **Software de servicios fundamentales:** El código del sistema que proporciona computación, almacenamiento, bases de datos y redes básicas.

### Seguridad «EN» la nube (Responsabilidad del cliente)
El cliente retiene el control total y la responsabilidad exclusiva sobre todo lo que decide desplegar, almacenar y configurar dentro de AWS:
* **Datos del cliente:** Propiedad de los datos, clasificación de la información y definición de permisos de acceso.
* **Sistemas operativos invitados (*Guest OS*):** Instalación, actualización, aplicación de parches de seguridad y mantenimiento de máquinas virtuales (como en Amazon EC2).
* **Configuración de red y cortafuegos:** Reglas de grupos de seguridad (*Security Groups*), listas de control de acceso a la red (NACL) y firewalls internos del sistema operativo.
* **Gestión de identidades y accesos (IAM):** Creación de usuarios, grupos, asignación de permisos, protección de contraseñas, tokens MFA y custodia de pares de claves SSH o claves de API.
* **Cifrado:** Configuración del cifrado de datos en reposo (lado cliente / lado servidor) y en tránsito (red).

---

## 2. Reparto de Responsabilidades según el Modelo de Servicio

El alcance exacto de la responsabilidad varía según el nivel de abstracción del servicio utilizado:

### Infraestructura como Servicio (IaaS)
* **Ejemplos:** Amazon EC2, Amazon EBS, Amazon VPC.
* **Control del cliente:** Máximo. Proporciona acceso a nivel de sistema operativo y control de redes virtuales.
* **Impacto en seguridad:** El cliente asume la **mayor carga operativa**. Debe gestionar los parches del sistema operativo, el software instalado, los antivirus locales y los grupos de seguridad. AWS solo garantiza el hardware, la virtualización y la red física.

### Plataforma como Servicio (PaaS)
* **Ejemplos:** Amazon RDS, AWS Lambda, AWS Elastic Beanstalk.
* **Control del cliente:** Medio. El cliente no tiene acceso directo al sistema operativo subyacente ni a los servidores físicos.
* **Impacto en seguridad:** AWS administra el sistema operativo, los parches del motor de ejecución o base de datos y la continuidad del servicio. El cliente se concentra en el **código de la aplicación, los datos almacenados y las políticas de acceso**.

### Software como Servicio (SaaS)
* **Ejemplos:** AWS Trusted Advisor, AWS Shield, Amazon Chime.
* **Control del cliente:** Mínimo sobre infraestructura.
* **Impacto en seguridad:** El software se aloja y ejecuta íntegramente por AWS de forma centralizada. El cliente **no administra infraestructura alguna**; su responsabilidad se limita a la configuración de usuarios autorizados, credenciales y parametrización de uso del servicio.

### Tabla Comparativa de Responsabilidades

| Tarea / Componente | IaaS (Ej. Amazon EC2) | PaaS (Ej. Amazon RDS) | SaaS (Ej. Amazon Chime) |
| :--- | :--- | :--- | :--- |
| **Seguridad física e instalaciones** | AWS | AWS | AWS |
| **Hipervisor y virtualización** | AWS | AWS | AWS |
| **Parches del Sistema Operativo** | **Cliente** | **AWS** | **AWS** |
| **Parches de la Aplicación / Motor BD** | **Cliente** | **AWS** | **AWS** |
| **Configuración de Firewall de Red** | **Cliente** (Security Groups) | Compartido / AWS | **AWS** |
| **Gestión de Datos y Accesos** | **Cliente** | **Cliente** | **Cliente** |

---

## 3. Escenarios Prácticos: ¿Quién es Responsable de Qué?

Para resolver cualquier caso o pregunta de examen, aplica esta regla general:
* **Es de AWS:** Si pertenece al hardware físico, a los centros de datos, a la red troncal global o al software que AWS gestiona como servicio gestionado (SO en RDS, hipervisor en EC2).
* **Es del Cliente:** Si es algo que se configura en la consola, un archivo que se sube, un parche en una máquina virtual propia, una clave privada o una regla de firewall.

### Casos típicos:
1. **Parches en un motor de base de datos:**
   * Si la base de datos corre en una instancia EC2 autogestionada: **Cliente**.
   * Si la base de datos corre bajo Amazon RDS: **AWS**.
2. **Seguridad en redes:**
   * Aislamiento de red entre cuentas de distintos clientes en el hipervisor: **AWS**.
   * Reglas de entrada y salida en un Security Group de una VPC: **Cliente**.
   * Mitigación de fallos en cables o enlaces troncales de una Región de AWS: **AWS**.
3. **Almacenamiento y claves:**
   * Permisos de acceso público o privado a un bucket de Amazon S3: **Cliente**.
   * Custodia de las claves privadas SSH (`.pem`) para acceder a instancias EC2: **Cliente**.
   * Destrucción segura de discos duros físicos dados de baja: **AWS**.
   * Exigir la activación de MFA a los empleados: **Cliente**.

---

## 4. AWS Identity and Access Management (IAM)

IAM es un servicio **gratuito y de alcance global** (no depende de una región específica; sus cambios aplican a toda la cuenta).

### Autenticación vs. Autorización
* **Autenticación (¿Quién eres?):** Proceso de validar la identidad de la entidad que intenta ingresar a la cuenta.
  * *Acceso por Consola:* ID/alias de cuenta (12 dígitos), nombre de usuario y contraseña (más token MFA si está habilitado).
  * *Acceso Programático (CLI, SDK, API):* Par de claves compuesto por **Access Key ID** y **Secret Access Key**.
* **Autorización (¿Qué tienes permitido hacer?):** Mecanismo que define a qué recursos específicos puede acceder esa identidad y qué acciones concretas puede ejecutar. Se gestiona exclusivamente a través de **políticas de IAM**.

### Identidades en IAM: Usuarios, Grupos y Roles

* **Usuario de IAM:** Persona o aplicación que interactúa directamente con AWS. Posee credenciales permanentes de largo plazo.
* **Grupo de IAM:** Colección de usuarios para aplicarles permisos idénticos de forma simultánea.
  * Un usuario puede pertenecer a múltiples grupos a la vez.
  * **Los grupos NO pueden anidarse** (un grupo no puede contener a otro grupo).
  * **NO existe un grupo predeterminado** que incluya a todos los usuarios de la cuenta.
* **Rol de IAM:** Identidad con permisos definidos que **no está asociada de forma fija a una persona**.
  * Diseñado para ser **asumido temporalmente** por un usuario, una aplicación o un servicio de AWS (como una instancia EC2).
  * Proporciona **credenciales de seguridad temporales** (sin necesidad de guardar claves estáticas en el código).

### Políticas de IAM y Lógica de Permisos
Las políticas son documentos estructurados en formato **JSON**:
* **Políticas basadas en identidad:** Se vinculan directamente a usuarios, grupos o roles.
* **Políticas basadas en recursos:** Se vinculan directamente al recurso (por ejemplo, una política de bucket en Amazon S3).
* **Lógica de evaluación:**
  1. **Denegación implícita:** Por defecto, cualquier solicitud que no cuente con una autorización explícita está denegada.
  2. **Permiso explícito (`Allow`):** Debe existir una declaración que autorice expresamente la acción.
  3. **Denegación explícita (`Deny`):** Si existe una regla de denegación explícita, **siempre tiene prioridad y anula cualquier permiso concedido en otra política**.
* **Principio de mínimo privilegio:** Otorgar únicamente los permisos indispensables para llevar a cabo la tarea asignada.

---

## 5. Buenas Prácticas para Proteger una Cuenta Nueva de AWS

1. **Abandonar el uso cotidiano del usuario raíz (*Root User*):**
   * El usuario raíz posee control ilimitado e irrestricto sobre la cuenta.
   * Usar el usuario raíz únicamente para crear un usuario individual de IAM con permisos administrativos.
   * Crear un grupo de administradores (con la política administrada `AdministratorAccess`), añadir el nuevo usuario al grupo y cerrar la sesión de raíz.
   * Deshabilitar y eliminar cualquier clave de acceso programática (*access keys*) asociada al usuario raíz.
   * Guardar las credenciales raíz en un lugar seguro y utilizarlas solo para gestiones contractuales o de facturación.
2. **Activar Autenticación Multifactor (MFA):** Habilitar MFA tanto en el usuario raíz como en todos los usuarios de IAM (aplicaciones virtuales como Google Authenticator/Authy, llaves de seguridad U2F o dispositivos hardware).
3. **Definir una política de contraseñas robusta:** Exigir longitud mínima, variedad de caracteres y rotación periódica.
4. **Monitoreo con AWS CloudTrail:** Habilitar el registro de actividad de llamadas API. Por defecto, almacena de forma gratuita los últimos **90 días** de eventos de gestión; para conservar el histórico a largo plazo, se debe configurar un *Trail* con destino a Amazon S3.

---

## 6. Cifrado y Servicios de Seguridad Complementarios

* **Cifrado en reposo:** Datos guardados en disco o medios de almacenamiento. **AWS KMS (*Key Management Service*)** administra claves respaldadas por módulos de seguridad de hardware (HSM) certificados bajo la norma **FIPS 140-2**.
* **Cifrado en tránsito:** Datos en movimiento por la red. Protegidos mediante protocolos estándar TLS/SSL gestionados y renovados automáticamente con **AWS Certificate Manager**.
* **Seguridad en Amazon S3:** Privado por defecto; protección mediante S3 Block Public Access, políticas de bucket y políticas de IAM.
* **Servicios de análisis y gobernanza:**
  * **Amazon GuardDuty:** Detección inteligente y continua de amenazas y anomalías en la cuenta mediante aprendizaje automático.
  * **Amazon Inspector:** Evaluación automatizada de vulnerabilidades y desviaciones de buenas prácticas en aplicaciones y cargas de trabajo.
  * **Amazon Macie:** Descubrimiento y protección de datos confidenciales o información de identificación personal (PII).
  * **AWS Config:** Registro, auditoría y evaluación continua de las configuraciones de los recursos frente a estándares deseados.
  * **AWS Artifact:** Portal centralizado para descargar informes de auditoría y certificaciones de conformidad de AWS (ISO, SOC, PCI).
  * **AWS Shield:** Protección administrada contra ataques DDoS (versión *Standard* gratuita y *Advanced* de pago).
  * **AWS Service Catalog:** Gestión centralizada de catálogos de servicios TI aprobados para su despliegue con restricciones específicas (regiones, IPs).

---

## 7. Confusiones Habituales en Preguntas de Examen

* **Anidamiento en IAM:** Un grupo de IAM **no puede contener otros grupos**.
* **Pertenencia a grupos:** Un usuario puede estar en varios grupos, pero **no existe ningún grupo predeterminado**.
* **Conflictos de permisos:** Si una política dice `Allow` y otra dice `Deny`, la **denegación explícita siempre prevalece**.
* **Roles vs. Usuarios:** Los roles proporcionan **credenciales temporales** y son asumidos por servicios o personas; los usuarios tienen credenciales permanentes.
* **Parcheado de base de datos:** En EC2 es del **cliente**; en RDS es de **AWS**.
* **Ámbito de IAM:** IAM es un servicio de alcance **global**, no regional.
* **Retención de CloudTrail:** El visor gratuito registra únicamente los últimos **90 días**.

---

💡 *El cuestionario interactivo ya se encuentra procesándose en tu panel Studio. Si quieres que añadamos algún caso práctico adicional o profundicemos en algún apartado específico de los apuntes, dímelo.*