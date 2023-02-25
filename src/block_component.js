const STATUS = {
    'error': -1,
    'warning': 2,
    'nil': 0,
    'success': 1
}

const block_component = Vue.createApp({
    data() {
        return {
            title: '',
        }
    },
    computed: {
        title_text() {
            return this.title;
        }
    }
});

block_component.component('block', {
    /*html*/
    template: `
        <div class="inputs" v-html="update_inputs">
        </div>
        <div class="node-content">
            <div class="title"> <span class="icon" v-html="icon"></span><span class="title_text" v-html="title_text"></span></div>
            <div class="body" :style="{'height': block_size+'px' }"></div>
            <div id="footer" style="height: 2rem; padding-top: 2rem;">
                <span class="status-indicator" :class="{ status_color }"></span>
            </div>
        </div>
        <div class="outputs" v-html="update_outputs">
        </div>`,

    props: {
    },

    data() {
        return {
            id: '',
            inputs: {},
            outputs: {},
            status: STATUS.nil
        }
    },
    methods: {
              
    },
    computed: {
        update_inputs() {
            let html = '';
            for (const [input_id, input_info] of Object.entries(this.inputs)) {
                html += `<div class="input ${input_id} tooltip">
                            <span class="type">${input_info.type}</span>
                            <span class="text-right title">${input_info.title}</span>
                        </div>`;
            }
            
            return html;
        },

        update_outputs() {
            let html = '';
            for (const [output_id, output_info] of Object.entries(this.outputs)) {
                html += `<div class="output ${output_id} tooltip">
                            <span class="type">${output_info.type}</span>
                            <span class="text-left title">${output_info.title}</span>
                        </div>`;
            }
            
            return html;
        },

        status_color() {            
            for (const [key, val] of Object.entries(STATUS)) {
                if(this.status == val) {
                    return key;
                }
            }
        },

        block_size() {
            let max_size = Math.max(Object.keys(this.inputs).length, Object.keys(this.outputs).length);
            if(max_size == 0) {
                return 32;
            }
            return max_size*32;
        }
    }
});