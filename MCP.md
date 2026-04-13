# Resumo das Capacidades do Conector MCP BELA

O BELA (Browser for Enterprise-Level Architecture) é uma plataforma para visualizar e navegar por arquiteturas de software, desde domínios de negócio de alto nível até elementos de código. Ele integra repositórios de código e ferramentas de monitoramento de performance (APM) para fornecer uma visão interativa e atualizada das dependências.

O servidor MCP Bela expõe **6 ferramentas** que permitem consultar a estrutura arquitetural e os elementos mapeados na plataforma. A seguir, detalho cada ferramenta com exemplos reais obtidos durante os testes.

## Ferramentas Disponíveis

### 1. `bela-resources-get`
Obtém a documentação essencial do BELA, fornecendo links para os conceitos fundamentais e tutoriais.
* **Uso**: Chamada sem parâmetros para recuperar os guias.
* **Exemplo de Retorno**:
  Retorna uma lista de documentos recomendados para leitura, como o `README.md` e `Concepts.md` no repositório GitHub do projeto.

### 2. `element-search`
Busca elementos na arquitetura por nome ou tipo. Retorna elementos "construídos" (extraídos de código) ou "modelados" (criados manualmente).
* **Parâmetros**: `query` (termo de busca).
* **Exemplo Real**:
  Busca por `"Steel Production Domain [system-domain]"` retornou o elemento modelado com o ID `4296`.
  Busca por `"bela-backend"` retornou o projeto Clojure `clojure-deps-project/bela-backend`.

### 3. `element-context-get`
Retorna o contexto completo de um elemento, incluindo seus contêineres e todas as suas dependências de entrada e saída.
* **Parâmetros**: `elementId` (caminho do elemento ou ID numérico).
* **Exemplo Real**:
  Ao consultar o ID `4296` (Steel Production Domain), a ferramenta retornou dezenas de sub-elementos que o compõem, como `Authentication`, `Payment`, `Risk-Management`, `Inventory Management`, etc.
  Ao consultar `clojure-deps-project/bela-backend`, mostrou que o projeto depende do agrupamento `grouping/libs` e do pacote Maven `maven/com.taoensso`.

### 4. `with-containers-up`
Retorna a hierarquia ascendente de um elemento, mostrando todos os seus contêineres até o nível raiz da organização.
* **Parâmetros**: `elementId`.
* **Exemplo Real**:
  Para o elemento `clojure-deps-project/bela-backend`, a hierarquia retornada foi:
  `["clojure-deps-project/bela-backend", "org/org"]`
  Para o domínio `4296`, a hierarquia foi:
  `[4296, 9166695, "org/org"]`

### 5. `deps-out`
Lista todas as dependências que saem de um elemento (do que ele depende). Pode ser filtrado por um elemento de destino específico.
* **Parâmetros**: `elementId` e opcionalmente `filterElementId`.
* **Exemplo Real**:
  As dependências de saída do projeto `project/bela-frontend` retornaram 2878 conexões sintéticas para o agrupamento `grouping/external-npm`.

### 6. `deps-in`
Lista todas as dependências que entram em um elemento (quem depende dele). Pode ser filtrado por um elemento de origem específico.
* **Parâmetros**: `elementId` e opcionalmente `filterElementId`.
* **Exemplo Real**:
  Ao consultar quem depende de `grouping/libs`, o retorno mostrou múltiplos projetos, como `clojure-deps-project/empire` (9173 dependências), `assembly/CodeAnalyzer` (328), e o próprio `clojure-deps-project/bela-backend` (188).

## Conclusão
O conector MCP BELA é poderoso para exploração de arquitetura. Ele permite navegar desde a organização macro (domínios e subdomínios) até os detalhes técnicos (projetos, pacotes e bibliotecas), identificando gargalos, acoplamentos e a estrutura de dependências do ecossistema de software.
