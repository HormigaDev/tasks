# Notas de la versión 1.2.0beta - `Español`

## Adiciones
* Agregado los métodos `dispatchRender` y `dispatch` en la clase `res` (respuesta de API) para mejorar el envío de informaciones repetitivas
* `Asuntos:` Los asuntos son una nueva adición para que se puedan guardar las conversaciones con una persona en una determinada línea de tiempo.
Los asuntos disponen de:
 * Barra de herramientas de filtración y organización
 * Base de datos independiente de la base de datos principal
 * `Timeline:` esta fución muestra todas las partes de conversaciónes con determinada persona en una línea de tiempo específica.
 * Agregado títulos a todos los botones con íconos para ser descritos

## Configuraciones
* Agregada una configuración para el límite de caracteres en la descrición de un asunto
* Agregada una configuración para deshabilitar el móodulo `Asuntos`
* Agregada una configuración para permitir mostrar el título de los componentes del menú o no.
* Agregada la configuración para seleccionar la prioridad preferente para una nueva tarea

## Correcciones
* Corregido el error de no mostrar el fondo de color verde para las tareas en el calendario que ya han sido finalizadas.
* Corregdo el código para que sea posible entrar a la tarea clicando dentro del ícono de calendario. Antiguamente esto generaba un error que al hacer click en un campo vacío se entraba a una tarea por el hecho de que estaba siendo considerado el contenedor en sí.
* Corregido el error que provocaba que el asunto se mantuviera incluso después de ser eliminado: Esto sucedía siempre que se archivaba un asunto antes de eliminarlo.


## Modificaciones
* Modificada la forma de enviar las respuestas de ruta usando los dos nuevos métodos creados.
* Ahora la primera vista que será renderizada al abrir la aplicación será `/calendar`
* Modificado el color y margen del contenedor en la vista `s-new` que antíguamente tenía un margen de 12px hacia los laterales y con un fondo que no estaba acorde a los demás fondos
* Ahora el menú lateral solamente muestra íconos
* Modificada la logitud de caracteres mostrados en las tareas del calendario: Ahora está limitado a 10 caracteres
* Modificada las posiciones del menú y retirado el espaciado superior.

___

# Version 1.2.0beta Release Notes - `English`

## Additions
* Added methods `dispatchRender` and `dispatch` to the `res` (API response) class to enhance sending repetitive information
* `Issues:` Issues are a new addition to allow saving conversations with a person on a specific timeline.
Issues feature:
 * Filter and organization toolbar
 * Independent database from the main database
 * `Timeline:` this function displays all conversation parts with a certain person on a specific timeline.
 * Added titles to all icon buttons for description

## Configurations
* Added configuration for character limit in issue description
* Added configuration to disable the `Issues` module
* Added configuration to allow showing menu component titles or not
* Added configuration to select preferred priority for a new task

## Fixes
* Fixed error not displaying green background color for tasks on the calendar that have already been completed.
* Fixed code to allow entering the task by clicking inside the calendar icon. Previously, this generated an error where clicking in an empty field would enter a task because the container itself was being considered.
* Fixed error causing the issue to persist even after deletion: This happened whenever an issue was archived before being deleted.

## Modifications
* Modified the way route responses are sent using the two new methods created.
* Now the first view rendered when opening the application will be `/calendar`
* Modified color and margin of the container in the `s-new` view, which previously had a 12px margin on the sides and a background that did not match the other backgrounds
* Now the sidebar menu only shows icons
* Modified character length shown in calendar tasks: Now limited to 10 characters
* Modified menu positions and removed top spacing.

___

# Notas da Versão 1.2.0beta - `Português`

## Adições
* Adicionados os métodos `dispatchRender` e `dispatch` na classe `res` (resposta da API) para aprimorar o envio de informações repetitivas
* `Assuntos:` Os assuntos são uma nova adição para permitir salvar conversas com uma pessoa em uma linha do tempo específica.
Os assuntos apresentam:
 * Barra de ferramentas de filtragem e organização
 * Banco de dados independente do banco de dados principal
 * `Timeline:` esta função exibe todas as partes da conversa com uma determinada pessoa em uma linha do tempo específica.
 * Adicionados títulos a todos os botões de ícones para descrição

## Configurações
* Adicionada configuração para limite de caracteres na descrição do assunto
* Adicionada configuração para desabilitar o módulo `Assuntos`
* Adicionada configuração para permitir mostrar títulos dos componentes do menu ou não
* Adicionada configuração para selecionar a prioridade preferencial para uma nova tarefa

## Correções
* Corrigido erro de não exibir cor de fundo verde para tarefas no calendário que já foram concluídas.
* Corrigido código para permitir entrar na tarefa ao clicar dentro do ícone do calendário. Anteriormente, isso gerava um erro onde clicar em um campo vazio entraria em uma tarefa porque o próprio contêiner estava sendo considerado.
* Corrigido erro que fazia o assunto persistir mesmo após a exclusão: Isso ocorria sempre que um assunto era arquivado antes de ser excluído.

## Modificações
* Modificada a maneira como as respostas de rota são enviadas usando os dois novos métodos criados.
* Agora a primeira visualização renderizada ao abrir o aplicativo será `/calendar`
* Modificado cor e margem do contêiner na visualização `s-new`, que anteriormente tinha margem de 12px nas laterais e um fundo que não combinava com os demais fundos
* Agora o menu lateral mostra apenas ícones
* Modificado comprimento de caracteres mostrados em tarefas do calendário: Agora limitado a 10 caracteres
* Modificadas posições do menu e removido espaçamento superior.