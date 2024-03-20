# Notas de la versión 1.2.0beta - `Español`

## Adiciones
* Agregado los métodos `dispatchRender` y `dispatch` en la clase `res` (respuesta de API) para mejorar el envío de informaciones repetitivas
* `Asuntos:` Los asuntos son una nueva adición para que se puedan guardar las conversaciones con una persona en una determinada línea de tiempo.
Los asuntos disponen de:
 * Barra de herramientas de filtración y organización
 * Base de datos independiente de la base de datos principal
 * `Timeline:`(próximamente) esta fución mostrará todas las partes de conversaciónes con determinada persona en una línea de tiempo específica.

## Configuraciones
* Agregada una configuración para el límite de caracteres en la descrición de un asunto
* Agregada una configuración para deshabilitar el móodulo `Asuntos`
* Agregada una configuración para permitir mostrar el título de los componentes del menú o no.

## Correcciones
* Corregido el error de no mostrar el fondo de color verde para las tareas en el calendario que ya han sido finalizadas.

## Modificaciones
* Modificada la forma de enviar las respuestas de ruta usando los dos nuevos métodos creados.
* Ahora la primera vista que será renderizada al abrir la aplicación será `/calendar`
* Modificado el color y margen del contenedor en la vista `s-new` que antíguamente tenía un margen de 12px hacia los laterales y con un fondo que no estaba acorde a los demás fondos
* Ahora el menú lateral solamente muestra íconos
* Modificada la logitud de caracteres mostrados en las tareas del calendario: Ahora está limitado a 10 caracteres
* Modificada las posiciones del menú y retirado el espaciado superior.
___

# Release Notes 1.2.0beta - `English`

## Additions
* Added methods `dispatchRender` and `dispatch` to the `res` class (API response) to improve sending repetitive information.
* `Subjects:` Subjects are a new addition to allow saving conversations with a person on a specific timeline.
Subjects feature:
  * Toolbar for filtering and organizing
  * Database independent of the main database
  * `Timeline:` (coming soon) This function will display all conversation parts with a particular person on a specific timeline.

## Configurations
* Added configuration for character limit in subject description.
* Added configuration to disable the "Subjects" module.
* Added configuration to allow showing menu component titles or not.

## Fixes
* Fixed issue of not showing green background color for tasks on the calendar that have already been completed.

## Modifications
* Changed the way of sending route responses using the two new created methods.
* Now the first view to be rendered when opening the application will be `/calendar`.
* Modified the color and margin of the container in the `s-new` view, which previously had a 12px margin towards the sides and with a background that was not consistent with the others.
* Now the sidebar menu only shows icons.
* Changed the character length displayed in calendar tasks: Now limited to 10 characters.
* Modified menu positions and removed top spacing.
___

# Notas da Versão 1.2.0beta - `Português`

## Adições
* Adicionados métodos `dispatchRender` e `dispatch` na classe `res` (resposta da API) para melhorar o envio de informações repetitivas.
* `Assuntos:` Assuntos são uma nova adição para permitir salvar conversas com uma pessoa em uma linha do tempo específica.
Os assuntos apresentam:
  * Barra de ferramentas para filtragem e organização
  * Banco de dados independente do banco de dados principal
  * `Timeline:` (em breve) Esta função mostrará todas as partes da conversa com uma pessoa específica em uma linha do tempo específica.

## Configurações
* Adicionada configuração para limite de caracteres na descrição do assunto.
* Adicionada configuração para desativar o módulo "Assuntos".
* Adicionada configuração para permitir mostrar ou não os títulos dos componentes do menu.

## Correções
* Corrigido problema de não mostrar a cor de fundo verde para tarefas no calendário que já foram concluídas.

## Modificações
* Alterada a forma de enviar respostas de rota usando os dois novos métodos criados.
* Agora, a primeira visualização a ser renderizada ao abrir o aplicativo será `/calendário`.
* Modificada a cor e a margem do contêiner na visualização `s-new`, que anteriormente tinha uma margem de 12px em relação aos lados e com um plano de fundo que não estava consistente com os outros.
* Agora, o menu lateral mostra apenas ícones.
* Alterado o comprimento de caracteres exibidos nas tarefas do calendário: Agora limitado a 10 caracteres.
* Modificadas as posições do menu e removido o espaçamento superior.
