<template>
  <div id="terminal" />
</template>
<script>
import { Terminal } from 'xterm';
import "xterm/css/xterm.css";
import { WebLinksAddon } from 'xterm-addon-web-links';
export default {
    props: ["id"],
    methods: {
    },
    mounted(){
        const terminal = new Terminal({cursorBlink: true});
        // Load WebLinksAddon on terminal, this is all that's needed to get web links
        // working in the terminal.
        const ws = new WebSocket(`ws://127.0.0.1:8888/ssh`);
        terminal.loadAddon(new WebLinksAddon());
        terminal.open(document.getElementById('terminal'));
        terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
        ws.onopen = function(e){
            console.log("ws opened", e.data);
        }
        ws.onmessage = function(e){
            terminal.write(e.data);
        };
        ws.onclose = function(){
            ws.send("close401");
        }
        terminal.onData(e => console.log(e));
        terminal.onKey(e =>{
            if(e.domEvent.code === "Enter"){
                terminal.write("\r\n");
                ws.send("1212test");
            } else {
                terminal.write(e.key);
            }
        });
    }
    
}
</script>
