const STATUS = {
    'error': -1,
    'warning': 2,
    'nil': 0,
    'success': 1
}

const block_component_tmpl = {
    data() {
        return {
            id: '',
            title: '',
            icon: '',
            inputs: {},
            outputs: {},
            typenode: false,
            status: STATUS.nil,
            name: '',
            block_properties: {}
        }
    },
    methods: {
            
        addInputs(inputs) {
            for (const [name, input] of Object.entries(inputs)) {
                input['connections'] = [];
                this.inputs[`n${this.id}_i${name}`] = input;
            }
        },
    
        addOutputs(outputs) {
            for (const [name, output] of Object.entries(outputs)) {
                output['connections'] = [];
                this.outputs[`n${this.id}_o${name}`] = output;
            }
        },
    
        deleteInputByName(name) {
            delete this.inputs[`n${this.id}_i${name}`];
            // Delete all the elements which has connection to input name
            $(`.n${this.id}_i${name}`).remove();
        },
        deleteOutputByName(name) {
            delete this.outputs[`n${this.id}_o${name}`];
            // Delete all the elements which has connection to input name
            $(`.n${this.id}_o${name}`).remove();
        }
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
        },

        title_text() {
            return this.title;
        }
    }
};