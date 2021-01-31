# NodeJS Cluster Experimentation
Estudos realizados com a biblioteca [Cluster](https://nodejs.org/docs/latest-v14.x/api/cluster.html#cluster_cluster) do NodeJS com o objetivo de aprender a como escalar uma aplicação verticalmente, utilizando mais recursos da máquina.

[![Generic badge](https://img.shields.io/badge/NodeJS-v14.15.4-green.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/NPM-v6.14.10-red.svg)](https://shields.io/)

### Visão geral
O NodeJS é um ambiente de runtime para JavaScript que utiliza um modelo Single Thread e realiza I/O não bloqueante, trabalhando sempre (e preferencialmente) de maneira assíncrona. Isto quer dizer que um processo NodeJS é executado em um único core do processador.
Com a biblioteca Cluster do NodeJS é possível escalar uma aplicação NodeJS para ser executada por múltiplos cores do processador a partir de processos filhos. Este método pode ser muito interessante para aproveitar ao máximo os recursos oferecidos por processadores multi-core, consequentemente melhorando o desempenho da aplicação.

### Como funciona?
A biblioteca Cluster do NodeJS permite a fácil criação de processos filhos que compartilham portas do mesmo servidor. É possível criar novos processos a partir de um processo principal utilizando o método `child_process.fork()`. Os processos filhos irão conversar com o processo principal via IPC (sigla em inglês para “Instruções por ciclo” e que faz referência a quantas operações um processador consegue desenvolver a cada ciclo).
A biblioteca Cluster suporta dois métodos de comunicação entre os processos `Round-robin` e `socket`:
- `Round-robin`: No método round-robin, o processo principal escuta uma determinada porta da máquina, por exemplo a porta `3000`. Este processo aceita novas conexões e distribuições entre os subprocessos (chamados `workers`) em uma forma de lista circular com uma inteligência integrada com o objetivo de evitar sobrecarregar algum subprocesso. Imagine que nossa aplicação receba dezenas de requisições concorrentes na porta `3000`. Ao invés de recebermos todas as requisições e processarmos utilizando um único processo NodeJS (o que geralmente ocorre), as requisições serão distribuidas entre os `workers` disponíveis a fim de dividir todo o trabalho da aplicação. Os workers estarão espalhados em diferentes cores do processador, dessa forma, podemos dizer que ocorre o paralelismo real entre os processos. Assim, leva-se menos tempo para responder a todas as requisições e utiliza-se ao máximo os recursos disponibilizados pela máquina.
- `socket`, para simplificar, vamos nos concentrar na abordagem round-robin (padrão em todas as plataformas exceto Windows). Você pode estudar mais sobre o assunto na seção [how it works](https://nodejs.org/docs/latest-v14.x/api/cluster.html#cluster_how_it_works) da documentação oficial.


**Importante:** *"O NodeJS não fornece lógica de roteamento. Portanto, é importante projetar um aplicativo de forma que ele não dependa muito de objetos de dados na memória para coisas como sessões e login."*

### Exemplo prático

### Testes
CPU: Ryzen 5 1600AF - 6 Cores 12 Threads.
