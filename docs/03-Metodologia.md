# Metodologia


Para o desenvolvimento deste trabalho, adotaremos a metodologia descrita a seguir, a qual abrangerá a relação de ambientes utilizados, a gestão do código fonte, definições dos processos, ferramentas e como a equipe se organizará e fará a gestão das tarefas ao longo do tempo disponível para a realização do projeto.

<!-- ## Relação de Ambientes de Trabalho
#
Os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito deverá ser apresentada em uma tabela que especifica que detalha Ambiente, Plataforma e Link de Acesso. 
Nota: Vide documento modelo do estudo de caso "Portal de Notícias" e defina também os ambientes e frameworks que serão utilizados no desenvolvimento de aplicações móveis. -->

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de `branches`:

- `main`: Representa a versão atualmente estável e testada do software, pronta para ser entregue ou implantada em produção;
- `develop`: Representa a versão em desenvolvimento do software, onde as funcionalidades estão sendo incorporadas e testadas continuamente;
- `feature`: Para cada nova funcionalidade a ser desenvolvida, uma nova **branch** de `feature` deve ser criada a partir da **branch** `develop`, seguindo o padrão de nomenclatura `feature-numero-do-cartao.numero-do-contribuinte`, onde `numero-do-cartao` representa o código numérico identificador da tarefa no **Trello** e o `numero-do-contribuinte` representa o número que representa o membro da equipe que vai de `1` a `6`.

   - `1` - Amanda de Lima Ventura;
   - `2` - Ellen Caroline Trindade Gonçalves Cândido;
   - `3` - Elpidio Lomeu Junior;
   - `4` - Leonardo Correia de Sá e Silva;
   - `5` - Odair Cordeiro Marra;
   - `6` - Shinji Matsumoto Fernandes.

Exemplo:
`feature-10.1` -> `10` representa o Card `10` no Trello e `1` representa a contribuinte `1` Amanda.

<br>

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/107289791/82446522-a716-4121-beff-96bc418d33b3)
<p align="center">Figura 02 - Diagrama da representação visual do Controle de Versão.</p>

<br>

Quanto à gerência de `commits`, o projeto adota a seguinte convenção para etiquetas:

- `doc`: Melhorias ou adições à documentação;
- `bug`: Resolução de problemas de uma funcionalidade já existente;
- `feature`: Novas funcionalidades a serem adicionadas ao projeto;
- `enhance`: Melhorias em funcionalidades já existentes;
<br>

## Gerenciamento de Projeto

### Divisão de Papéis

 - `Scrum Master`: Ellen Caroline Trindade Gonçalves Cândido;
 - `Product Owner`: Shinji Matsumoto Fernandes;

 - `Designer UI/UX`: 
    - Amanda de Lima Ventura;
    - Leonardo Correia de Sá e Silva;

 - `Arquiteto de Software`: Elpidio Lomeu Junior;
 - `Analista de Testes (Quality Assurance)`: Odair Cordeiro Marra;
 
 - `Equipe de Desenvolvimento`: 
   - Amanda de Lima Ventura;
   - Ellen Caroline Trindade Gonçalves Cândido;
   - Elpidio Lomeu Junior;
   - Leonardo Correia de Sá e Silva;
   - Odair Cordeiro Marra;
   - Shinji Matsumoto Fernandes.


### Processo

A metodologia de gestão de projeto adotada será o Scrum e o Kanban. Todas as tarefas serão organizadas no Trello, seguindo a estrutura a seguir:

- `Product Backlog`: Contém todas as atividades que devem ser realizadas no projeto, desde a documentação até o desenvolvimento da aplicação.
- `Sprint Backlog`: Lista as tarefas definidas previamente para a Sprint Atual (Etapa Atual), e deve ser atualizada com a data de início da sprint.
- `In Progress`: Contém as tarefas em andamento durante a sprint atual.
- `Validating`: Contém as tarefas que precisam ser testadas.
- `Done`: Contém todas as tarefas finalizadas, independentemente da sprint.

Ao receber uma tarefa que estará listada na coluna "To-do", a pessoa estudante deverá clonar o repositório localmente e criar uma nova **branch** de `feature` a partir da **branch** `develop` para trabalhar na funcionalidade. Após concluir a implementação, o desenvolvedor deve realizar um **commit** e, em seguida, fazer o merge da **branch** `feature` criada com a **branch** `develop`. Somente após a conclusão e testes da versão do projeto é que se deve fazer o merge da `develop` com a `main` para seguir com o fluxo normal do projeto.

<br>

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/107289791/8790fbf4-dd1e-4aa6-8ca1-a451166891b2)




<br>

<p align="center">Figura 03 - Representação do Quadro de Gerenciamento</p align="center">

### Relação de Ambientes de Trabalho

Abaixo segue a tabela de relação dos ambientes e plataformas que serão utilizados em todo o desenvolvimento do projeto.

| Ambiente                        | Plataforma           |
|---------------------------------|----------------------|
| Repositório de código fonte     | [Github](https://github.com/)               |
| Documentos do projeto           | [Github](https://github.com/) - [Google Docs](https://www.google.com/docs/about/)              |
| Projeto de Interface e Wireframes | [Figma](https://www.figma.com/) - [Draw.io](https://app.diagrams.net/)             |
| Gerenciamento do Projeto        | [Trello](https://trello.com/pt-BR) |
| Modelagem de Processos          | [Camunda](https://console.cloud.camunda.io/)              |

<br>

### Ferramentas

Abaixo está a correlação das ferramentas utilizadas no projeto, e suas funções correspondentes:

| Função                                 | Ferramentas                                      |
|----------------------------------------|--------------------------------------------------|
| Editor de código                        | [Visual Studio Code](https://code.visualstudio.com/) - [Expo](https://expo.dev/) - [Github](https://github.com/)   |
| Ferramentas de Comunicação              | [Discord](https://discord.com/) - [Teams](https://www.microsoft.com/pt-br/microsoft-teams/)                             |
| Ferramentas de Diagramação              | [Lucidchart](https://www.lucidchart.com/pages/pt) - [ProjectLibre](https://www.projectlibre.com/) - [Office365](https://www.office.com/)                         |
| Ferramentas de Modelagem de Processos   | [Camunda](https://console.cloud.camunda.io/)                             |
| Ferramentas de Gestão de Projetos       | [Trello](https://trello.com/pt-BR)                                     |

<br>
Foram escolhidos editores de código que se destacam por sua integração com o sistema de versionamento e pela facilidade de colaboração da equipe na elaboração do código. Da mesma forma, as ferramentas de comunicação foram selecionadas devido à sua capacidade de integração, o que simplifica a comunicação interna entre os membros da equipe.
Além disso, as ferramentas utilizadas para criação de diagramas e modelagem de processos foram escolhidas com base na sua capacidade de atender às necessidades específicas da solução em desenvolvimento. Elas oferecem uma visualização aprimorada do produto final e permitem que a equipe colabore de forma simultânea, transformando o processo em uma experiência colaborativa.
