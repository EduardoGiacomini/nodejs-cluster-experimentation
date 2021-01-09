# NodeJS Cluster Experimentation
Experimentos realizados com a biblioteca [Cluster](https://nodejs.org/docs/latest-v14.x/api/cluster.html#cluster_cluster) do NodeJS com o objetivo de escalar uma aplicacção verticalmente.

[![Generic badge](https://img.shields.io/badge/NodeJS-v14.15.4-green.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/NPM-v6.14.10-red.svg)](https://shields.io/)

### Visão geral
O NodeJS é um ambiente de runtime para JavaScript que utiliza um modelo Single Thread e realiza I/O não bloqueante, trabalhando sempre (e preferencialmente) de maneira assíncrona. Isto quer dizer que um processo NodeJS é executado em um único core do processador.
Com a biblioteca Cluster do NodeJS é possível escalar uma aplicação NodeJS para ser executada por múltiplos cores do processador a partir de processos filhos que compartilham a mesma porta da aplicação. Este método pode ser muito interessante para aproveitar ao máximo os recursos oferecidos por processadores multi-core, consequentemente melhorando o desempenho da aplicação.

### Como funciona
É possível criar novos processos filhos utilizando o método `child_process.fork()`, estes processos filhos irão conversar com o processo principal via IPC.
A biblioteca Cluster suporta dois métodos de de comunicação entre os processos, para simplificar, vamos nos concentrar na abordagem round-robin (padrão em todas as plataformas exceto Windows). Você pode estudar mais sobre o assunto na seção [how it works](https://nodejs.org/docs/latest-v14.x/api/cluster.html#cluster_how_it_works) da documentação oficial.
No método round-robin, o processo principal escuta em uma porta X. Este processo aceita novas conexões e distribuições entre os subprocessos (chamados workers) em uma forma de lista circular com alguma inteligência integrada para evitar sobrecarregar algum subprocesso.

**Importante:** *"O NodeJS não fornece lógica de roteamento. Portanto, é importante projetar um aplicativo de forma que ele não dependa muito de objetos de dados na memória para coisas como sessões e login."*

### Exemplo prático

### Testes
CPU: Ryzen 5 1600AF - 6 Cores 12 Threads.
