# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

![Diagrama de classes](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/42a8d0f1-9d27-4ef7-bd90-97157e6fc45e)



## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

![DER - V3](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/107289791/05dbffa0-2b45-49c6-8645-4dcfd175fc52)


## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
[Esquema Relacional PDF](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/tree/main/docs/img/EsquemaRelacional-2care-02-03-24.pdf)
![Esquema Relacional PNG](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/96087622/73451fb5-2b13-40b9-b995-73d9915e086a)




## Modelo Físico

[Modelo Físico](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/tree/main/src/db/banco.sql)

## Documentação da Implementação do Banco de Dados NoSQL

A decisão de integrar um banco de dados NoSQL neste projeto é impulsionada pela sua capacidade de melhorar o desempenho e aliviar a carga em nosso banco de dados relacional e infraestrutura backend. Atualmente, muitas vezes o tempo de resposta das aplicações é prejudicado por consultas mal otimizadas em bancos de dados relacionais e constantes operações de JOIN em várias tabelas. Ao utilizar a velocidade do NoSQL, podemos realizar um cache eficiente e periódico, entregando todos os dados aos nossos clientes e mantendo nosso banco de dados relacional como source of truth.

Aproveitando a velocidade e eficiência da tecnologia NoSQL, podemos tirar proveito do crescente poder computacional de dispositivos modernos, como computadores e smartphones. Isso nos permite transferir certas tarefas de processamento para o usuário final, utilizando frameworks como React, o que aumenta significativamente a escalabilidade de nossa aplicação.

A abordagem visa simplificar boa parte do nosso modelo relacional para um modelo NoSQL desestruturado, permitindo o armazenamento de todas as informações relevantes em uma lista de chave-valor no NoSQL, para ser consumida pelos usuários. Isso permite que o React tenha acesso à maioria das informações dentro de seu contexto, reduzindo drasticamente o número de solicitações feitas à nosso backend e banco de dados. Dessa forma, podemos nos concentrar apenas no que realmente importa, como finalização de processos e alterações de informações.

#### Modelo NoSQL utilizado
```json
{
  "Caregivers": [{
    "name": "Ringui",
    "picture": "URL",
    "latitude": 100.000,
    "longitude": -70.000,
    "gender": "Male",
    "birth_date": "1990-01-01",
    "qualifications": [],
    "work_exp": [],
    "specializations": [],
    "fixed_unavailable_days": [0, 6],
    "fixed_unavailable_hours": [0, 1, 2, 3, 4, 5, 6, 7, 22, 23],
    "custom_unavailable_days": ["20/03/2024"],
    "hour_price": 20.00,
    "day_price": 150.00,
    "max_request_km": 10,
    "work_exp_years": 0,
    "additional_info": "",
    "evaluations": [{
      "user": "Jorge",
      "comment": "Great!",
      "rating": 5
    }],
    "care_requests_dates": ["2024-03-10", "2024-03-12"]
  }]
}
```

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

## Justificativa

Dentre as 31 subcaracterísticas elencadas pela ISO IEC 25010/2011, optamos por selecionar 11 delas por entendermos que são as essenciais para avaliarmos a qualidade do produto e seu sucesso no momento da entrega para o cliente. 

## Método da Avaliação

Serão aplicados questionários qualitativos a 5 Desenvolvedores para avaliarem os quesitos intrínsecos (código e arquitetura) e a 5 Usuários para avaliarem os quesitos extrínsecos (aspectos aparentes do aplicativo).

![Screenshot 2024-02-27 225725](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/e4269f46-2f5f-4cb2-975d-c9f6085680a8)

![Screenshot 2024-02-27 225831](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/95561090-14d0-40e4-b57a-97e1174ed07d)

![Screenshot 2024-02-27 230219](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/471da2c0-e748-456a-8456-4ef5127631fd)

![Screenshot 2024-02-27 230029](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/91d1229e-1fa5-4486-9c07-4c7037ade354)

## Critérios e Métricas

Serão adotadas pontuações para os atributos de qualidade, permitindo assim termos a pontuação por cada Subcaracterísticas. São elas:

![Screenshot 2024-02-27 230531](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/a747de4a-f689-4858-a33f-92c9b791e2e2)

O cálculo dessa pontuação será realizado por meio da planilha abaixo, a qual está configurada para apurar a pontuação final conforme critério definido pela 2Gather, sendo: Ao informarmos a o resultado dos Questionários aplicados, teremos então a pontuação obtida por cada subcaracterística. Na sequência teremos a pontuação da Característica que será a média das suas Subcaracterísticas. Por fim, faremos a média das 7 características, que será a pontuação da "QS" Qualidade do Software. 

![Screenshot 2024-02-27 230653](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/657ad43e-8faa-436e-9663-89f8bee8bc20)
![Screenshot 2024-02-27 230725](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/10ce7f0e-b284-4a20-9386-2c6e4d23a571)

![Screenshot 2024-02-27 230918](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/6e13c066-9cf5-494e-a524-e14787c14e0b)
![Screenshot 2024-02-27 230846](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/57705331-b193-4927-96c4-3d97f1fb0c6a)

Após a consolidação da pontuação obtida com os questionários respondidos, verificaremos a pontuação final da "QS" e compararemos com a Tabela "INDICADOR DE QUALIDADE":

![Screenshot 2024-02-27 230554](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-t1-2care/assets/114453508/357dab26-0c86-4e5f-ab59-e589346aa92e)

Feito esta análise, teremos o resultado da aferição da Qualidade do Software desenvolvido.
