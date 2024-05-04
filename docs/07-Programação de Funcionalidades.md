# Programação de Funcionalidades

### Funcionalidade 01: Cadastro de usuários (RF-01)
A funcionalidade permite o cadastro de usuários, dividindo-os em dois tipos de usuários: clientes e cuidadores.

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/2b3e14d8-6f60-401d-9687-1daa2af50187" alt="Main page" width="33%"/>
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/cd33e153-a291-4e07-9876-70b85540b2c2" alt="Cadastro de Cliente" width="33%"/>
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/0024d912-b9a8-4988-8372-ea74d03c4ff1" alt="Cadastro de Cuidador" width="33%"/>

##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2. Encontre a seção "Crie agora mesmo a sua conta!" e clique no botão referente ao tipo de conta que deseja criar conta (Cliente ou Cuidador)
3. Será redirecionado para a página contendo o formulário referente ao tipo da conta
4. Preencha os campos do formulário
5. Clique em "Criar conta"
   
##### Artefatos produzidos
* [Tela de Cadastro](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/pages/Register.js)
* [Formulário Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/components/Forms/CaregiverForm.js)
* [Formulário Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/components/Forms/CarereceiverForm.js)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 02: Login na conta de usuário criada (RF-01)
A funcionalidade permite o login na conta de usuários criada.

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/assets/12260321/2b3e14d8-6f60-401d-9687-1daa2af50187" alt="Main page" width="50%"/>

##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2. Encontre a seção "Entre agora mesmo!"
3. Preencha com e-mail e senha corretos referentes a sua conta
4. Clique no botão "Entrar"
   
##### Artefatos produzidos
* [Login page](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/pages/Login.js)
* [Formulário de Login](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/components/Forms/LoginForm/LoginForm.js)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 03: Edição de dados da conta (RF-02)
A funcionalidade permite que o usuário possa editar os dados de sua conta, apagando, adicionando ou alterandos seus dados.


##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2. Efetue o login corretamente
3. No canto superior esquerdo, clique em sua foto de perfil
4. Será redirecionado para a página de Perfil
5. Clique no botão "Editar"
6. Altere seus dados como desejar
7. Clique no botão "Salvar"
   
##### Artefatos produzidos
* [Componentes utilizados no Perfil](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/Profile)
* [Perfil Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/pages/carereceiver/ProfileCareReceiver.jsx)
* [Perfil Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/pages/caregiver/ProfileCaregiver.jsx)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 04: Busca de cuidadores (RF-03)
A funcionalidade permite que o usuário cliente possa buscar por cuidadores.


##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2. Efetue o login corretamente
3. Na barra superior, digite o que busca na barra de pesquisa
4. Será redirecionado para a página com a sua busca aplicada exibindo os cuidadores que se aplicam a ela.
   
##### Artefatos produzidos
* [Barra superior](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/TopBar)
* [Busca aplicada]()
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 05: Cuidador pode delimitar sua região de atendimento (RF-04)
A funcionalidade permite que o usuário cuidador, no momento do cadastro da conta, especifique qual sua região de atuação através do CEP. Além disso, a qualquer momento esse dado pode ser alterado, como especificado na Funcionalidade 03.


##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2. Efetue o login corretamente
3. No canto superior esquerdo, clique em sua foto de perfil
4. Será redirecionado para a página de Perfil
5. Clique no botão "Editar"
6. Altere seus dados como desejar
7. Clique no botão "Salvar"
   
##### Artefatos produzidos
* [Componentes utilizados no Perfil](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/Profile)
* [Formulário Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/components/Forms/CaregiverForm.js)
* [Perfil Cuidador](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/blob/develop/src/react/2care/src/pages/caregiver/ProfileCaregiver.jsx)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 06: Aplicar filtros para encontrar profissionais (RF-05)
A funcionalidade permite que o usuário use filtros para encontrar profissionais por formação, especialização e/ou tempo de experiência como cuidadores.


##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2.
   
##### Artefatos produzidos
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)
* 
### Funcionalidade 07: Cuidador disponibilizar horários e datas de atendimento (RF-06)
A funcionalidade permite que o usuário cuidador disponibilize suas datas e horários disponíveis para o atendimento.	


##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2.
   
##### Artefatos produzidos
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 08: Cliente avaliar cuidador (RF-07)
A funcionalidade permite o cliente avalie o cuidador que lhe prestou serviço, utilizando de uma avaliação quantitativa de 1 a 5 (1 sendo pouco recomendado e 5 muito recomendado) e um comentário justificando sua avaliação.



##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2. Efetue o login corretamente
   
##### Artefatos produzidos
* [Componentes de Avaliação](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/Ratings)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 09: Visualizar avaliações do cuidador (RF-08)
A funcionalidade permite o cliente visualize as avaliações anteriores atribuídas as cuidador.



##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2. Clique no cuidador que deseja ver a avaliação
3. Clique em "Avaliações"
   
##### Artefatos produzidos
* [Componentes de Avaliação](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/Ratings)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

### Funcionalidade 10: Cuidador inserir seus valores de atendimento (RF-09)
A funcionalidade permite o cuidador insira seus valores de atendimento por hora e por dia.



##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2. Efetue o login corretamente
3. No canto superior esquerdo, clique em sua foto de perfil
4. Será redirecionado para a página de Perfil
5. Clique no botão "Editar"
6. Altere seus valores de atendimento como desejar
7. Clique no botão "Salvar"
   
##### Artefatos produzidos
* [Componentes de Avaliação](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/react/2care/src/components/Ratings)
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)


### Funcionalidade 11: Apresentar o valor dos serviços ao cliente no momento da busca	 (RF-10)
A funcionalidade permite o cliente visualize o valor dos serviços dos cuidadores no momento da busca.



##### Instruções de acesso
1. Acesse o site em [Link](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t2-g5-2gather).
2. Apresentar os cuidadores e seus referentes valores
   
##### Artefatos produzidos
* [API](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t1-2care/tree/develop/src/api)

