const block_palette_component = Vue.createApp({
    data() {
        return {
            blocks: {

            }
        }
    },
    methods: {
              
    },
    computed: {
        update_palette() {
            
            let html = '';
            
            for (const [block_id, block_info] of Object.entries(this.blocks)) {
                html += `<div class="drag-drawflow" draggable="true" ondragstart="drag(event)" data-node="${block_id}">
                    ${block_info['block_icon']}<span>${block_info['block_name']}</span>
                </div>`;
            }
            return html;
        }
    }
});

