
# Projeto de Interface

Visão geral da interação do usuário pelas telas do sistema e protótipo interativo das telas com as funcionalidades que fazem parte do sistema (wireframes).

 Apresente as principais interfaces da plataforma. Discuta como ela foi elaborada de forma a atender os requisitos funcionais, não funcionais e histórias de usuário abordados nas <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a>.

## Diagrama de Fluxo

O diagrama de fluxo é uma representação visual do fluxo sistemático de dados, criado com o propósito de facilitar o planejamento das interações e aprimorar a qualidade do desenho dos wireframes que estão na sequência logo abaixo.

#### Diagrama de Fluxo Mobile

![Diagrama de Fluxo Mobile](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/6044bc47-1203-4293-8565-81b59ee0f17f)

#### Diagrama de fluxo versão Web
![Diagrama de Fluxo Web](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/51541c3e-52fe-4eae-8424-4d4efc8c653a)

## Wireframes 

Wireframes são protótipos utilizados no design de interfaces para indicar a estrutura de uma aplicação e as conexões entre suas páginas. Eles consistem em representações visuais que se aproximam do layout dos elementos fundamentais da interface. Logo abaixo, apresentamos os wireframes da aplicação móvel 2Care.
 
### Home
 Esta é a tela inicial que o usuário encontrará ao abrir o aplicativo 2Care. Nela, visualizamos a logomarca, acompanhada por uma breve saudação que apresenta o propósito do aplicativo. Além disso, a tela conta com dois botões: um direciona o usuário para explorar a Tela Inicial, enquanto o outro facilita o processo de login.
 
 ![Home](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/4937a5fd-a4c7-4ac0-8b76-ae652225137a)

### Tela Inicial - Usuário Não Autenticado
 Na Tela Inicial quando o usuário não está autenticado. Neste ponto, o usuário terá a possibilidade de realizar uma busca por texto livre e visualizar perfis de cuidadores independentes, apresentando seus nomes, especializações, distâncias, avaliações em estrelas e fotos. Logo abaixo, há um rodapé com duas opções: efetuar o login ou realizar uma busca utilizando filtros específicos.
 
![Tela Inicial](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/df343f81-318d-443b-b68a-77418ed56a91)

### Tela de Login
 Na tela de login, o usuário deparará com a logomarca do aplicativo, sendo necessário o preenchimento dos campos de e-mail e senha. Posteriormente, encontrará um botão de "Entrar". Além disso, há um texto adicional que informa que, caso ainda não esteja registrado, basta clicar neste texto para ser redirecionado à página de cadastro.

 ![Tela de Login](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/08cfddf2-8e5d-4e80-9500-a9c79d83edbf)

### Tela de Registro
 Na tela de registro, o usuário se deparará com uma opção que o orientará a escolher entre criar um perfil de cliente ou de cuidador. Clicando em "Cadastre-se", será automaticamente redirecionado para a tela de cadastro.

 ![Tela de Registro](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/4ed3e76d-b654-4f42-a946-17ed389c930d)


### Tela de Cadastro - Geral
Nesta tela, o usuário irá preencher os dados principais, e logo, escolher entre "Cuidador" ou "Cliente".

![Tela de Cadastro - Geral](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/713707be-5369-4e52-b905-3f3b344c8d68)

### Tela de Cadastro - Cuidador
 Se o usuário escolher criar um perfil de cuidador, ele deverá preencher todos os campos necessários e, em seguida, clicar em "Criar Conta".

 ![Registro Cuidador2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/a4021bf5-98f2-4c1a-8892-6f2f3569e8b2)
 ![Registro Cuidador3](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/de745223-9690-4c3d-b0cb-0b5fe0cac392)

### Tela de Cadastro - Cliente
Se o usuário escolher criar um perfil de cliente, ele deverá preencher todos os campos necessários e, em seguida, clicar em "Criar Conta".

![Cadastro Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/f0c02686-7d90-4282-9cc1-809d88c3f82f)


### Tela Inicial - Usuário Autenticado
Na Tela Inicial do Cliente Autenticado, há uma distinção em relação à Tela Inicial do Cliente Não Autenticado. Em vez de exibir a opção de fazer login no rodapé, agora é apresentada a opção de acessar o perfil. Na ocasião de Usuário Cliente, ele poderá também visualizar as propostas enviadas por ele, e no caso de Usuário Cuidador, ele poderá visualizar as propostas recebidas.

![Tela Inicial Usuário Autenticado](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/7c0a8f32-2131-488f-9f4e-60e2ec930909)

### Tela Busca por Filtro
Na tela de Busca por Filtros, a experiência será uniforme para Usuários Não Autenticados, bem como para Usuários Autenticados, seja na condição de Clientes ou Cuidadores. Nessa interface, serão apresentadas opções de filtros, permitindo que o usuário as preencha conforme suas preferências e, em seguida, clique em "Filtrar".

![Tela Busca por Filtro](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/47b83a26-f278-4253-88f2-65d46fe28b56)


### Tela de Busca por Filtro - Resultados
A tela de resultados da busca por filtro será uniforme para usuários não autenticados, bem como para usuários autenticados na condição de Cliente e Cuidador. Nessa tela, os filtros aplicados serão exibidos juntamente com os resultados obtidos na busca.

![Tela de Busca por Filtro Resultados](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/105eeac7-c28c-4b4d-8d8d-7431300ef509)

### Tela de Perfil - Cliente
Na tela de perfil, o Cliente terá a capacidade de visualizar suas informações, além de ter a opção de clicar no botão de edição ou sair da aplicação.

![Tela de Perfil Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/2fab7c80-440d-41d3-bc9d-95e473237e38)

### Tela de Editar Perfil - Cliente
Na tela de edição de perfil, quando o usuário assume a condição de Cliente, ele terá a capacidade de modificar suas informações e salvar as alterações realizadas.

![Tela de Perfil Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/8bc6fbee-ae10-4009-a40c-4f34c876e708)

### Tela de Propostas Enviadas - Cliente
Na tela de propostas enviadas, o cliente terá acesso a todas as propostas que submeteu, com a opção de filtrá-las por status: Aceitas, Recusadas ou Pendentes.

![Tela de Propostas Enviadas - Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/8656c1ba-8fba-4a6b-b21e-56475926a8ca)

### Tela de Perfil - Cuidador
Na tela de perfil do cuidador, ele terá acesso à visualização das informações pessoais, a opção de editar esses dados, ou sair. Além disso, poderá verificar sua agenda e optar por visualizar informações básicas ou profissionais, assim como consultar suas avaliações ou sair do perfil.

![Tela de Perfil Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/02022b31-3d0e-498f-947a-406ce4099da7)
![Tela de Perfil Cuidador2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/83bee2f0-a6a6-41ca-a3ba-110c402d8aa1)

### Tela de Editar Perfil - Cuidador
Na tela de edição de perfil, quando o usuário assume a condição de Cuidador, ele terá a capacidade de modificar suas informações e salvar as alterações realizadas.

![Tela de Editar Perfil do Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/61e2952c-d866-44af-8e31-dcce200b3f04)
![Tela de Editar Perfil do Cuidador2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/e59ece67-3516-4640-bdcb-493fbb039833)

### Tela de Perfil Selecionado
Na tela do Perfil Selecionado, tanto os usuários não autenticados quanto aqueles autenticados na condição de cliente visualizarão a mesma apresentação. Isso inclui o nome do cuidador, sua agenda, informações básicas e profissionais, botão para visualizar as avaliações e a opção de enviar uma proposta (caso o usuário não esteja autenticado, será redirecionado para a tela de login).

![Tela de Perfil Selecionado](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/866bac63-ed6c-4c46-8126-8682b46f405e)
![Tela de Perfil Selecionado2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/18645183-1e55-4a6f-bcd8-e73877f29f5b)

### Tela de Agenda - Visão do Usuário Cliente
Na tela de Agenda, tanto os usuários não autenticados quanto os autenticados na condição de cliente visualizarão a mesma apresentação. Isso inclui um calendário exibindo a agenda do cuidador, acompanhado por um botão para enviar proposta (no caso de não autenticação, o usuário será redirecionado para o login).

![Tela de Agenda - Visão do Usuário Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/006a7fda-cd8f-4f95-adb8-745a2af7f2fb)

### Tela de Avaliações
Na tela de Avaliações, os usuários não autenticados e os autenticados na condição de cliente, que não tiveram propostas validadas pelo cuidador em questão, terão acesso às avaliações realizadas por outros usuários que contrataram o mesmo cuidador. Poderão filtrar por classificação (mais estrelas à menos estrelas). Além disso, encontrarão um botão para enviar proposta (caso não estejam autenticados, serão redirecionados para a tela de login).

![Tela de Avaliações](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/5da5d359-4541-4dad-b9de-0fec624cac65)


### Tela de Avaliações - Cliente que teve sua proposta aceita pelo Cuidador
Na tela de Avaliações, os usuários que tiveram suas propostas validadas pelo cuidador terão acesso às avaliações feitas por outros usuários que também contrataram esse cuidador. Poderão filtrar por classificação (mais estrelas à menos estrelas). Além disso, eles encontrarão botões para enviar sua própria avaliação e para enviar uma nova proposta.

![Tela de Avaliações2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/c7b41b03-610a-405e-b2cd-4f6bee5773d7)


### Tela Avaliar
Na tela de Avaliação, o usuário que teve sua proposta validada pelo cuidador terá a possibilidade de enviar sua avaliação, contando com um botão dedicado para esse fim.

![Tela Avaliar](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/b321e806-0d0d-46f7-849a-fc07fdc5e581)

### Tela Enviar Proposta
Na tela de Envio de Proposta, o usuário autenticado na condição de cliente terá a capacidade de submeter sua proposta preenchendo os campos relevantes. Com base no valor especificado no perfil do cuidador, o cliente visualizará imediatamente o custo associado à proposta. Após preenchimento, poderá enviar a proposta através do botão correspondente.

![Tela Enviar Proposta](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/b5175e45-337b-4d58-b57f-d5cf5ea1540b)

### Tela Suas Avaliações - Cuidador
Nesta tela, o cuidador terá acesso às avaliações realizadas pelos clientes aos quais ele aceitou propostas.

![Tela Suas Avaliações](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/55ba62ae-94d3-4a96-80f5-0ccf8cb6af7d)

### Tela Agenda - Visão do Usuário Cuidador
Nesta tela, o cuidador terá uma visão consolidada de sua agenda, incluindo dias e horários fixos indisponíveis, bem como as datas em que propostas foram aceitas. Ele poderá clicar nos campos de valores para visualizar suas tarifas e acessar o botão de propostas para examinar novas propostas recebidas.

![Tela Agenda - Visão do Usuário Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/41662f59-f8f9-4ff7-8b84-545a1cd36380)

### Tela Editar Agenda - Cuidador
Na tela de Edição de Agenda, o cuidador terá a capacidade de ajustar sua agenda conforme necessário e salvar as alterações realizadas.

![Tela Editar Agenda](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/6849c219-1abb-466a-834d-5b6f543fbc73)

### Tela Valores - Cuidador
Na Tela de Valores, o cuidador terá a opção de visualizar, ajustar e salvar suas tarifas.

![Tela Valores](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/9e631293-c205-41fa-83c6-c1515c4aa831)

### Tela de Perfil Selecionado - Visão do Cuidador
Nesta tela, o cuidador estará explorando os perfis de outros cuidadores, podendo visualizar exclusivamente as informações básicas, profissionais e a agenda.

![Tela de Perfil Selecionado - Visão do Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/ebc952a5-dade-40b3-a417-59a662e8b466)
![Tela de Perfil Selecionado - Visão do Cuidador2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/3ef9476e-3309-4206-abd0-4074d522d906)

### Tela Propostas - Cuidador
Nesta tela, o cuidador terá a capacidade de examinar as propostas recebidas e decidir entre aceitar ou recusar cada uma delas.

![Tela Propostas](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/113949375/27ee234f-35f6-4a5e-b4b1-e0464003897c)

## Wireframes Web

Wireframes são protótipos utilizados no design de interfaces para indicar a estrutura de uma aplicação e as conexões entre suas páginas. Eles consistem em representações visuais que se aproximam do layout dos elementos fundamentais da interface. Logo abaixo, apresentamos os wireframes da aplicação móvel 2Care.

## Login

![login](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/3c3d61fe-7bd8-401d-8f33-4afe2f2a8f31)

## Cadastro

![Cadastro](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/724428c2-db7c-4094-8900-5c5b465febdb)

## Cadastro Cliente

![Cadastro Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/d7e17900-0453-4a2d-9d5f-b49be0b8e38c)

## Cadastro Cuidador

![Cadastro Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/3bb50139-0808-4782-ba33-d724d158dbf4)

## Home / Busca 

![Busca comum](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/9d26a669-bfc1-4549-88c4-177492853741)

## Home / Busca por filtro

![Busca por filtro](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/15cdc4fc-6ce1-4351-847a-696b177e4658)

## Perfil selecionado

![Perfil selecionado](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/bd04aa2f-7c2c-4bc2-851a-d5603c332d69)

## Avaliações

![Avaliações](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/b2c0f932-5d7a-41f4-b8a5-f161ca95b2ef)

## Contato

![Contato](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/7e9cb48c-48ec-4ad9-8409-0bfe6e7bd319)

## Contato / Enviar Proposta

![Contato e Enviar Proposta](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/cbb70b33-e19f-464e-80ba-b27eae1f7d52)

## Editar perfil - Cliente

![Editar perfil - Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/3da7600e-ba11-4679-9a80-f452bd59a25b)

## Editar perfil - Cuidador

![Editar perfil - Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/21993438/657cafa4-2ef8-4ae7-8a0d-def7706d126a)
