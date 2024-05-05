# Programação de Funcionalidades

As funcionalidades desenvolvidas na aplicação estão apresentadas com sua respectiva descrição, requisitos aos quais elas se relacionam, artefatos produzidos, rotas da API utilizadas e imagens demonstrativas de como essas funcionalidades aparecem na aplicação na versão Web. Uma documentação mais detalhada da API desenvolvida está disponível no Swagger através do endpoint `api/core/swagger/` e conta com todos os endpoints configurados e seus respectivos retornos esperados.

### Funcionalidade 01: Cadastro de usuários (RF-01)
A funcionalidade permite o cadastro de usuários, dividindo-os em dois tipos de usuários: clientes e cuidadores.

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/2b3e14d8-6f60-401d-9687-1daa2af50187" alt="Main page" width="33%"/>
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/cd33e153-a291-4e07-9876-70b85540b2c2" alt="Cadastro de Cliente" width="33%"/>
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/0024d912-b9a8-4988-8372-ea74d03c4ff1" alt="Cadastro de Cuidador" width="33%"/>

##### Instruções de acesso
1. Acesse o site.
2. Encontre a seção "Crie agora mesmo a sua conta!" e clique no botão referente ao tipo de conta que deseja criar conta (Cliente ou Cuidador)
3. Será redirecionado para a página contendo o formulário referente ao tipo da conta
4. Preencha os campos do formulário
5. Clique em "Criar conta"
   
##### Artefatos produzidos
* [Tela de Cadastro](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/pages/Register.js)
* [Formulário Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/components/Forms/CaregiverForm.js)
* [Formulário Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/components/Forms/CarereceiverForm.js)
* Endpoint: [api/user/register/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/user)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 02: Login na conta de usuário criada (RF-01)
A funcionalidade permite o login na conta de usuários criada.

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/2b3e14d8-6f60-401d-9687-1daa2af50187" alt="Main page" width="50%"/>

##### Instruções de acesso
1. Acesse o site
2. Encontre a seção "Entre agora mesmo!"
3. Preencha com e-mail e senha corretos referentes a sua conta
4. Clique no botão "Entrar"
   
##### Artefatos produzidos
* [Login page](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/pages/Login.js)
* [Formulário de Login](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/components/Forms/LoginForm/LoginForm.js)
* Endpoint: [api/user/login/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/user)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 03: Edição de dados da conta (RF-02)
A funcionalidade permite que o usuário possa editar os dados de sua conta, apagando, adicionando ou alterandos seus dados.
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/bf371df3-8da3-4704-8c98-73bfbf5e6b54" alt="Editar perfil" width="50%"/>

##### Instruções de acesso
1. Acesse o site
2. Efetue o login corretamente
3. No canto superior direito, clique em sua foto de perfil
4. Será redirecionado para a página de Perfil
5. Clique no botão "Editar"
6. Altere seus dados como desejar
7. Clique no botão "Salvar"
   
##### Artefatos produzidos
* [Componentes utilizados no Perfil](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/Profile)
* [Perfil Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/pages/carereceiver/ProfileCareReceiver.jsx)
* [Perfil Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/pages/caregiver/ProfileCaregiver.jsx)
* Endpoint: [api/user/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/user)
* Endpoint: [api/caregiver/edit/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/caregiver)
* Endpoint: [api/carereceiver/edit/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/carereceiver)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 04: Busca de cuidadores (RF-03)
A funcionalidade permite que o usuário cliente possa buscar por cuidadores.

<img src="" alt="Buscar profissionais" width="50%"/>

##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2. Efetue o login corretamente
3. Na barra superior, digite o que busca na barra de pesquisa
4. Será redirecionado para a página com a sua busca aplicada exibindo os cuidadores que se aplicam a ela.
   
##### Artefatos produzidos
* [Barra superior](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/TopBar)
* [Busca aplicada]()
* Endpoint: [api/caregiver/list/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/caregiver)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 05: Cuidador pode delimitar sua região de atendimento (RF-04)
A funcionalidade permite que o usuário cuidador especifique qual sua região de atuação informando qual a distância máxima a qual ele estará disponível para receber propostas de serviço.

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/69263454-d9ed-44d9-8439-26664b00e27b" alt="Editar perfil cuidador" width="50%"/>


##### Instruções de acesso
1. Acesse o site
2. Efetue o login corretamente como cuidador
3. No canto superior direito, clique em sua foto de perfil
4. Será redirecionado para a página de Perfil
5. Clique no botão "Editar"
6. Altere os dados de "Máxima distância de atendimento"
7. Clique no botão "Salvar"
   
##### Artefatos produzidos
* [Componentes utilizados no Perfil](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/Profile)
* [Formulário Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/components/Forms/CaregiverForm.js)
* [Perfil Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/pages/caregiver/ProfileCaregiver.jsx)
* Endpoint: [api/caregiver/edit](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/caregiver)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 06: Aplicar filtros para encontrar profissionais (RF-05, RF-03)
A funcionalidade permite que o usuário use filtros para encontrar profissionais por formação, especialização, distância e/ou tempo de experiência como cuidadores.

<img src="" alt="Filtrar profissionais" width="50%"/>

##### Instruções de acesso
1. Acesse o site
2. No canto superior, há uma barra de busca
3. Digite o que procura
4. Será redirecionado para uma página onde poderá aplicar os filtros especificados.
   
##### Artefatos produzidos
*
* Endpoint: [api/caregiver/list/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/caregiver)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)
  
### Funcionalidade 07: Cuidador disponibilizar horários e datas de atendimento (RF-06)
A funcionalidade permite que o usuário cuidador disponibilize suas datas e horários disponíveis para o atendimento. Quando o cliente visualizar os dados do cuidador, poderá consultar sua disponibilidade.	

<img src="" alt="Disponibilidade do cuidador" width="50%"/>

##### Instruções de acesso
1. Acesse o site
2. Efetue o login corretamente como cuidador
3. No canto superior direito, clique em sua foto de perfil
4. Será redirecionado para a página de Perfil
5. Clique no botão "Editar"
6. Altere seus horários e datas de atendimento
7. Clique no botão "Salvar"
   
##### Artefatos produzidos
* Endpoint: [api/caregiver/edit/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/caregiver)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 08: Cliente avaliar cuidador (RF-07)
A funcionalidade permite o cliente avalie o cuidador que lhe prestou serviço, utilizando de uma avaliação quantitativa de 1 a 5 (1 sendo pouco recomendado e 5 muito recomendado) e um comentário justificando sua avaliação.

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/acc67feb-6ee1-42ac-a461-0414932f9505" alt="Avaliar cuidadores" width="50%"/>

##### Instruções de acesso
1. Acesse o site
2. Efetue o login corretamente como cliente
3. Encontre o cuidador que lhe prestou serviço
4. Clique em "Avaliar"
5. Atribua uma nota em estrelas de 1 a 5
6. Adicione um comentário justificando sua nota
7. Clique em "Salvar"
   
##### Artefatos produzidos
* [Componentes de Avaliação](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/Ratings)
* Endpoint: [api/caregiver/rating/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/caregiver)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 09: Visualizar avaliações do cuidador (RF-08)
A funcionalidade permite o cliente visualize as avaliações anteriores atribuídas as cuidador.

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/acc67feb-6ee1-42ac-a461-0414932f9505" alt="Avaliações dos cuidadores" width="50%"/>

##### Instruções de acesso
1. Acesse o site
2. Clique no cuidador que deseja ver a avaliação
3. Clique em "Avaliações"
   
##### Artefatos produzidos
* [Componentes de Avaliação](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/Ratings)
* Endpoint: [api/caregiver/rating/{id}](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/caregiver)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 10: Cuidador inserir seus valores de atendimento (RF-09)
A funcionalidade permite o cuidador insira seus valores de atendimento por hora e por dia.

<img src="" alt="Valores dos cuidadores" width="50%"/>


##### Instruções de acesso
1. Acesse o site
2. Efetue o login corretamente
3. No canto superior direito, clique em sua foto de perfil
4. Será redirecionado para a página de Perfil
5. Clique no botão "Editar"
6. Altere seus valores de atendimento como desejar
7. Clique no botão "Salvar"
   
##### Artefatos produzidos
* [Componentes de Avaliação](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/Ratings)
* Endpoint: [api/caregiver/edit/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/caregiver)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)


### Funcionalidade 11: Apresentar o valor dos serviços ao cliente no momento da busca	 (RF-10)
A funcionalidade permite o cliente visualize o valor dos serviços dos cuidadores no momento da busca.

<img src="" alt="Valores dos cuidadores" width="50%"/>

##### Instruções de acesso
1. Acesse o site
2. Efetue o login corretamente
3. Na página inicial, irá ser apresentado os cuidadores e seus referentes valores
   
##### Artefatos produzidos
* Endpoint: [api/caregiver/list/](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api/caregiver)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

