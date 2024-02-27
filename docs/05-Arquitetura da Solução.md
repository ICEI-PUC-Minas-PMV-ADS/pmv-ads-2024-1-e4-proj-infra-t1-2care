# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.

> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

Nossa solução envolve uma variedade de tecnologias que abrangem o desenvolvimento web e móvel, design de interface, gerenciamento de banco de dados, controle de versão e muito mais. Abaixo, listamos as principais tecnologias que estamos utilizando para implementar nossa solução:

### Ambiente de Desenvolvimento
- **Expo:** Utilizamos o Expo para simplificar o desenvolvimento e os testes durante a fase de prototipagem e desenvolvimento inicial. Facilita a visualização da nossa aplicação em dispositivos móveis em tempo real.
- **IDEs**
  - **Visual Studio Code:** O Visual Studio Code oferece uma experiência de desenvolvimento eficiente, suportando JavaScript, Python, React e uma ampla variedade de extensões úteis.

### Desenvolvimento Web
- **React:** Escolhemos o React para desenvolver a interface web de nossa aplicação. Esta biblioteca JavaScript facilita a criação de interfaces de usuário dinâmicas e reativas, permitindo-nos desenvolver uma experiência de usuário rica e interativa. Com o React, podemos criar componentes web reutilizáveis, o que melhora a eficiência do desenvolvimento e a manutenção do código.

### Desenvolvimento Mobile
- **React Native:** Utilizamos o React Native como a base para o desenvolvimento de nosso aplicativo móvel. Ele nos permite criar aplicativos para iOS e Android com uma única base de código, economizando tempo e recursos.
- **React Native Paper:** Para fornecer uma interface de usuário consistente e atraente, adotamos o React Native Paper como uma biblioteca de componentes de interface de usuário.

### Desenvolvimento Backend e Banco de Dados
- **Django:** Para o backend, escolhemos o Django devido à sua arquitetura robusta, que nos permite desenvolver uma API segura e escalável. Ele simplifica o desenvolvimento ao oferecer recursos como o ORM (Object-Relational Mapping) para abstrair o banco de dados e um sistema de autenticação integrado.
- **PostgreSQL:** Optamos pelo PostgreSQL como nosso sistema de gerenciamento de banco de dados relacional devido à sua conformidade com os padrões SQL, suporte a recursos avançados (como tipos de dados JSON e hstore) e sua robustez. O PostgreSQL oferece desempenho excepcional para aplicações que exigem transações complexas e uma grande quantidade de operações de leitura e escrita, tornando-o ideal para o nosso backend.
- **MongoDB:** Para dados que se beneficiam de uma estrutura de armazenamento mais flexível, escolhemos o MongoDB. Ele nos permite armazenar dados no formato de documentos, o que é ideal para determinados tipos de informações que nossa aplicação manipula.

### Design e Prototipagem
- **Figma:** Para o design de interface de usuário e a prototipagem de telas, escolhemos o Figma. Ele permite a colaboração em tempo real e a criação de interfaces visualmente atraentes.

### Controle de Versão
- **GitHub:** Utilizamos o GitHub como nossa plataforma de controle de versão, permitindo que nossa equipe colabore de forma eficaz e mantenha um registro completo de todas as alterações no código-fonte.
- **Git:** O Git é a ferramenta de controle de versão subjacente que usamos em conjunto com o GitHub para gerenciar nossos repositórios e controlar o histórico de alterações.

### Gerenciamento de Projeto
- **Trello:** O Trello será usado como ferramenta de gerenciamento de projeto. Ele nos ajudará a organizar tarefas, atribuir responsabilidades e acompanhar o progresso do projeto.

Ao finalizar a descrição das tecnologias utilizadas, incluímos componentes essenciais para um desenvolvimento eficiente e moderno de uma aplicação distribuída. Cada escolha tecnológica foi feita visando otimizar o desenvolvimento, garantir a segurança, e permitir a escalabilidade da aplicação. A integração dessas tecnologias nos permite criar uma solução robusta que atende às necessidades do projeto, oferecendo uma experiência de usuário rica tanto na web quanto em plataformas móveis. A estratégia de hospedagem escolhida garante flexibilidade, controle e a capacidade de escalar a aplicação conforme o crescimento da demanda, assegurando uma infraestrutura confiável para os usuários finais.

## Hospedagem

A hospedagem da aplicação será uma parte crítica da infraestrutura do nosso projeto. Optamos por uma abordagem que oferece flexibilidade e controle, permitindo que o próprio grupo configure e gerencie o ambiente de hospedagem. Aqui estão os detalhes sobre como a aplicação será hospedada:

**Infraestrutura de Hospedagem**
  - Utilizaremos uma Virtual Private Server (VPS) com o sistema operacional Ubuntu como base para hospedar nossa aplicação. A escolha de uma VPS nos permite ter total controle sobre o ambiente, incluindo a capacidade de configurar o servidor de acordo com as necessidades específicas do nosso aplicativo.

**Containers**
- Para garantir a isolamento e a portabilidade da nossa aplicação, optamos por executá-la em um container Docker na VPS. O Docker é uma tecnologia de conteinerização que nos permite empacotar todos os componentes necessários da aplicação em um ambiente isolado e leve. Isso simplifica a implantação e a escalabilidade da aplicação.

**Configuração da VPS**
- O grupo será responsável por configurar a VPS com Ubuntu, incluindo a instalação de todas as dependências necessárias para o nosso aplicativo. Isso pode incluir a instalação de um servidor web, um banco de dados, bibliotecas e ferramentas específicas.

**Implantação**
- A implantação da aplicação será realizada diretamente na VPS. O grupo fará o upload dos contêineres Docker contendo a aplicação e suas dependências para a VPS. Em seguida, os contêineres serão executados na VPS para tornar a aplicação acessível pela rede.

**Segurança**
- A segurança da VPS será uma prioridade. Serão implementadas práticas recomendadas de segurança, como firewalls, atualizações de segurança regulares.

**Escalabilidade**
- A infraestrutura será configurada de forma a permitir a escalabilidade da aplicação. Isso significa que, se necessário, poderemos adicionar recursos adicionais à VPS ou replicar a aplicação em várias instâncias para lidar com um aumento na carga de trabalho.

<br>
Em resumo, optamos por hospedar nossa aplicação em uma VPS com Ubuntu, executando-a em containers Docker para isolamento e flexibilidade. Isso nos permite ter total controle sobre o ambiente de hospedagem, garantindo que possamos atender às necessidades específicas do nosso projeto. O grupo será responsável pela configuração, implantação, gerenciamento e segurança da infraestrutura de hospedagem, garantindo que nossa aplicação seja executada de forma eficaz e segura. nossa aplicação, optamos por executá-la em um container Docker na VPS. 

## Qualidade de Software

Conceituar qualidade é uma tarefa complexa, porém pode ser compreendida como um método gerencial que, por meio de procedimentos disseminados por toda a organização, busca assegurar a entrega de um produto final que atenda às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características que devem ser atendidas, garantindo que o produto de software satisfaça as necessidades de seus usuários. No entanto, esse nível de satisfação nem sempre é alcançado espontaneamente, necessitando ser continuamente construído. Dessa forma, a qualidade do produto depende significativamente do respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 31 subcaracterísticas de qualidade para produtos de software. Com base nessas características e subcaracterísticas, é necessário identificar quais delas serão utilizadas pela equipe de desenvolvimento com referência para o projeto de software, desempenhando o papel de balizadores para a verificação da qualidade. A seguir, apresentamos a justificativa, as subcaracterísticas escolhidas pela equipe e as métricas que possibilitarão a avaliação da qualidade do software.

### Justificativa

Dentre as 31 subcaracterísticas elencadas pela ISO IEC 25010/2011, optamos por selecionar 11 delas por entendermos que são as essenciais para avaliarmos a qualidade do produto e seu sucesso no momento da entrega para o cliente. 

### Método da Avaliação

Serão aplicados questionários qualitativos a 5 Desenvolvedores para avaliarem os quesitos intrínsecos (código e arquitetura) e a 5 Usuários para avaliarem os quesitos extrínsecos (aspectos aparentes do aplicativo).

![Screen Shot 2024-02-27 at 19 15 18](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/0899d53b-a5a6-42cd-afff-f573629136c1)

![Screen Shot 2024-02-27 at 19 16 58](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/263eb7aa-b005-45b0-aecf-4ba43480c5e3)

![Screen Shot 2024-02-27 at 19 17 34](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/f5baa07c-5519-4e12-9647-4e4e5f15dea4)

![Screen Shot 2024-02-27 at 19 18 37](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/2965cc0a-8f41-4c4c-9b08-44bc4271a28e)


> **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/)
