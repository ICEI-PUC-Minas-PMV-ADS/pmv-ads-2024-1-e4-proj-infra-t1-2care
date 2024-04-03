# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.
 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Testes Unitários - Componentes Isolados - API

### Casos de Teste para Model

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------------|--------------------|----------------------------|
| SM-01 | SpecializationModel | Verificar a criação de um objeto Specialization com dados válidos. | Dados válidos para uma especialização (por exemplo, `name=1`). | Objeto Specialization criado com sucesso. | - |
| SM-02 | SpecializationModel | Testar validações de campos obrigatórios do modelo Specialization. | Dados sem o campo `name`. | Erro de validação dos campos. | - |
| SM-03 | SpecializationModel | Verificar a atualização de um objeto Specialization existente. | Objeto Specialization existente e novos dados para atualização (por exemplo, `name=2`). | Objeto Specialization atualizado com sucesso. | - |
| SM-04 | SpecializationModel | Testar exclusão de um objeto Specialization. | Objeto Specialization existente. | Objeto Specialization excluído com sucesso. | - |

### Casos de Teste para Serializer

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------------|--------------------|----------------------------|
| SP-01 | `SpecializationSerializer` | Verificar a serialização de uma instância de especialização com dados válidos. | Instância de `Specialization` com dados válidos. | Dados da especialização serializados corretamente. | - |
| SP-02 | `SpecializationSerializer` | Testar a criação de uma especialização com dados válidos usando o serializer. | Dados válidos de uma nova especialização. | Nova especialização criada com sucesso.                    | - |
| SP-03 | `SpecializationSerializer` | Testar a criação de uma especialização com dados inválidos usando o serializer. | Dados inválidos para uma nova especialização. | Erro de validação do campo 'nome'. | - |
| SP-04 | `SpecializationSerializer` | Verificar a atualização de uma especialização existente com dados válidos usando o serializer. | Dados válidos para atualizar uma especialização existente. | Especialização existente atualizada com sucesso. | - |
| SP-05 | `SpecializationSerializer` | Testar a atualização de uma especialização com dados inválidos usando o serializer. | Dados inválidos para atualizar uma especialização. | Falha na validação dos dados, impedindo a atualização. | - |
| SP-06 | `SpecializationSerializer` | Verificar a recuperação de todas as especializações cadastradas. | N/A | Lista de todas as especializações cadastradas. | - |
| SP-07 | `SpecializationSerializer` | Testar a recuperação de uma especialização específica pelo nome. | Nome de uma especialização existente. | Especialização específica recuperada com sucesso. | - |
| SP-08 | `Specialization` | Testar a exclusão de uma especialização pelo ID. | ID de uma especialização existente. | Especialização específica excluída com sucesso. | - |

### Casos de Teste para View

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Requisição** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------|--------------------|----------------------------|
| SV-01 | `SpecializationListCreateView` | Testar a listagem de todas as especializações. | GET request para `/api/specializations` | Lista de todas as especializações. | - |
| SV-02 | `SpecializationListCreateView` | Verificar a criação de uma especialização via API. | POST request para `/api/specializations` com dados válidos de uma especialização. | Especialização criada com sucesso. | - |
| SV-03 | `SpecializationRetrieveUpdateDestroyView` | Testar a obtenção de uma especialização específica pela API. | GET request para `/api/specializations/{id}` com um ID válido. | Dados da especialização correspondente. | - |
| SV-04 | `SpecializationRetrieveUpdateDestroyView` | Testar a atualização de uma especialização via API. | PUT request para `/api/specializations/{id}` com um ID válido e novos dados. | Especialização atualizada com sucesso. | - |
| SV-05 | `SpecializationRetrieveUpdateDestroyView` | Verificar a exclusão de uma especialização via API. | DELETE request para `/api/specializations/{id}` com um ID válido. | Confirmação de exclusão da especialização. | - |
| SV-06 | `SpecializationListView` | Testar a listagem de todas as especializações (alternativa). | GET request para `/api/specializations/list` | Lista de todas as especializações. | - |

### Casos de Teste para Rotas

| **ID do Caso de Teste** | **Componente** | **Descrição** | **URL** | **Método Esperado** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|---------|---------------------|----------------------------|
| SU-01 | `specialization/` | Verificar se a URL para listagem e criação de Especializações está corretamente configurada. | `/specialization/` | GET, POST | - |
| SU-02 | `specialization/<uuid:pk>/` | Testar a configuração da URL para detalhes, atualização e exclusão de uma Especialização específica. | `/specialization/<uuid:pk>/` | GET, PUT, DELETE | - |
| SU-03 | `specialization/list/` | Verificar se a URL para a listagem de Especializações (alternativa) está correta. | `/specialization/list/` | GET | - |


## Testes de Integração - API

### Casos de Teste

| **ID do Caso de Teste** | **Descrição** | **Endpoints** | **Ação** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|---------------|---------------|----------|----------------------|--------------------|----------------------------|
| TI-S01 | Verificar se a criação de uma nova especialização via POST reflete corretamente no banco de dados e pode ser recuperada. | `/api/specialization`, `/api/specialization/{uuid}` | Criação e Recuperação  | Dados JSON válidos de uma especialização. | Especialização criada refletida no DB e recuperável. | - |
| TI-S02 | Testar a criação de uma especialização com dados inválidos e verificar o tratamento de erro. | `/api/specialization` | Criação com Falha | Dados JSON inválidos de uma especialização. | Resposta de erro HTTP 400 e nenhuma criação no DB. | - |
| TI-S03 | Verificar o processo de exclusão de uma especialização via DELETE e a tentativa subsequente de recuperação dessa especialização. | `/api/specialization/{uuid}` | Exclusão e Tentativa de Recuperação | UUID de uma especialização existente. | Especialização excluída do DB e não encontrável posteriormente. | - |
| TI-S04 | Testar o fluxo completo de atualização de dados de uma especialização: atualizar via PUT e depois recuperar para verificar a atualização. | `/api/specialization/{uuid}` | Atualização e Verificação | UUID de uma especialização existente e novos dados JSON. | Dados da especialização atualizados corretamente no DB e na resposta da API. | - |
| TI-S05 | Testar a atualização de uma especialização com dados inválidos e verificar o tratamento de erro. | `/api/specialization/{uuid}` | Atualização com Falha  | UUID de uma especialização existente e dados JSON inválidos. | Resposta de erro HTTP 400 e nenhuma atualização no DB.  | - |
| TI-S06 | Testar a listagem de todas as especializações via GET após a adição de novas especializações para verificar se a listagem está atualizada. | `/api/specialization/list` | Adição e Listagem | Dados JSON válidos de especializações novas. | Listagem de especializações deve incluir as especializações recém-adicionadas. | - |
