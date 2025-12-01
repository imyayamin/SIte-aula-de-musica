# Site "Música ao Alcance de Todos"

O projeto “Democratizando o Acesso à Música: Desenvolvendo um Controlador MIDI de Baixo Custo”, apresentado na XVI FICE, integra o desenvolvimento de um Controlador MIDI (Musical Instrument Digital Interface) de baixo custo,
com o uso de VSTI’s (Virtual Studio Technology Instruments) gratuitos, junto a um site, entitulado "Música ao Alcance de Todos" que possui atividades baseadas em escalas, acordes e músicas simples. 
Esse repositório armazena o código desse site, e o escopo do projeto junto com os requisitos funcionais e não-funcionais e diagramas podem ser encontrados [aqui](https://docs.google.com/document/d/e/2PACX-1vTIT86R4cfLvUkJ6x2LE7PtpsEFPUV0FVidODY5EJVsxjaRYErMLsm1_3f_kmPQcl8phNG-U1VNcSgr/pub).

---

## Passo a passo para utilizar o dispositivo MIDI junto ao site

### 1. Configurações iniciais

* Baixar e instalar o Midi BLE, que pode ser encontrado [aqui](https://github.com/Maxime-J/BLE-MIDI-Bridge/releases/latest/download/ble-midi-bridge-windows-x64.zip). Ele será responsável por conectar o esp32 Bluetooth.
* Baixar e instalar o [NumaPlayer](https://www.studiologic-music.com/products/numaplayer/#section-download), que irá conectar a porta midi configurada pelo Midi BLE.
* Acessar o [site](https://smartapps.click/ifcmidi) desenvolvido.

### 2. Passos para configurar o VST

* Instale um software VST (utilizamos o Numa Player).
* Abra o programa e selecione o(s) instrumento(s) que preferir entre as opções disponíveis.
* Conecte seu teclado MIDI ao computador e certifique-se de que está reconhecido pelo sistema pela opção "MIDI Inputs".
* Selecione o dispositivo MIDI.
* Teste pressionando teclas no teclado MIDI para garantir que o som está saindo pelo VST.
* Mantenha o VST aberto enquanto utiliza as atividades musicais do site.
* Siga os passos antes de quaisquer sessões de atividades que vai realizar no site.
