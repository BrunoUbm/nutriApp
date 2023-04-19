<template>
    
    <body>
        <HeaderOptions />
        <div class="principal">
            <div class="informacoes">
                <form>
                    <h1>Informações do paciente:</h1>
                    <input type="text" v-model="nome" placeholder="Nome do(a) cliente">
                    <input type="text" v-model="sexo" placeholder="Digite o sexo"> 
                    <input type="text" v-model="idade" placeholder="Digite sua idade">
                    <input type="text" v-model="peso" placeholder="Digite seu peso">
                    <input type="text" v-model="altura" placeholder="Digite sua altura">
                    <input type="text" v-model="mlg" placeholder="Massa livre de gordura">
                    <input type="date" v-model="data">
                    <button class="button-enviar" @click="CalculoTmd">Calcular</button>
                    <div class="cadastro" v-if="cadastro === true">
                        <p>Cliente: {{ nome }}</p>
                        <p>Sexo: {{ sexo }}</p>
                        <p>Idade: {{ idade }} anos</p>
                        <p>Peso: {{ peso }} kg</p>
                        <p>Altura: {{ altura }} m</p>
                        <p>MLG: {{ mlg }}</p>
                    </div>
                    <button class="button-resetar" @click="ResetCadastro" v-if="cadastro === true">Reset</button>
                </form>
            </div>
            <div class="results" v-if="cadastro === true">
                <div class="lineone">
                    <div class="harrys element">
                        <h2 v-if="sexo === 'Feminino'"><span>Harrys e Benedict: </span>{{ female_result_harris }}</h2>
                        <h2 v-if="sexo === 'Masculino'"><span>Harrys e Benedict: </span>{{ male_result_harris }}</h2>
                    </div>
                    <div class="fao element">
                        <h2 v-if="sexo === 'Feminino'"><span>FAO/OMS: </span>{{ female_result_fao }}</h2>
                        <h2 v-if="sexo === 'Masculino'"><span>FAO/OMS: </span>{{ male_result_fao }}</h2>
                    </div>
                </div>
                <div class="linetwo">
                    <div class="jeor element">
                        <h2 v-if="sexo === 'Feminino'"><span>Mifflin-St Jeor: </span>{{ female_result_jeor }}</h2>
                        <h2 v-if="sexo === 'Masculino'"><span>Mifflin-St Jeor: </span>{{ male_result_jeor }}</h2>
                    </div>
                    <div class="cunningham element">
                        <h2 v-if="sexo === 'Feminino' || sexo === 'Masculino'"><span>Cunningham: </span>{{ cunningham }}</h2>
                    </div>
                </div>
                <div class="linetree">
                    <div class="tinsplayp element">
                        <h2 v-if="sexo === 'Feminino' || sexo === 'Masculino'"><span>Tinslay(PESO): </span>{{ tinslayp }}</h2>
                    </div>
                    <div class="tinsplaymlg element">
                        <h2 v-if="sexo === 'Feminino' || sexo === 'Masculino'"><span>Tinslay(MLG): </span>{{ tinslaymlg }}</h2>
                    </div>
                </div>
                <button class="save-data" @click="SalvarDados">Salvar Resultados</button>
            </div>
        </div>
    </body>
</template>

<style>

</style>

<script>
import axios from 'axios'
import HeaderOptions from './partials/HeaderOptions.vue'
export default{
    data(){
        return{
            nome: null,
            idade: null,
            peso: null,
            altura: null,
            sexo: null,
            mlg: null,
            data: null,
            female_result_harris: null,
            male_result_harris: null,
            female_result_fao: null,
            male_result_fao: null,
            female_result_jeor: null,
            male_result_jeor: null,
            cunningham: null,
            tinslayp: null,
            tinslaymlg: null,
            cadastro: false
        }
    },
    components: {
        HeaderOptions
    },
    methods: {
        CalculoTmd(a){
           a.preventDefault()
           this.cadastro = true

            const idade = parseFloat(this.idade)
            const peso = parseFloat(this.peso)
            const altura = parseFloat(this.altura)
            const mlg = parseFloat(this.mlg)

            const calculo1 = (() => {
                const female_result_harris = 655 + (9.6 * peso) + (1.9 * altura) - (4.7 * idade)
                const male_result_harris = 66 + (13.8 * peso) + (5.0 * altura) - (6.8 * idade)
                this.female_result_harris = female_result_harris.toFixed(2)
                this.male_result_harris = male_result_harris.toFixed(2)
            })
            calculo1()

            const calculo2 = (() => {
                if(idade >= 10 && idade <= 17){
                    const male_result_fao = (17.868 * peso) + 658.2
                    this.male_result_fao = male_result_fao.toFixed(2)

                    const female_result_fao = (13.384 * peso) + 692.6
                    this.female_result_fao = female_result_fao.toFixed(2)
                }
                else if(idade >= 18 && idade <= 29){
                    const male_result_fao2 = (15.057 * peso) + 692.2
                    this.male_result_fao = male_result_fao2.toFixed(2)

                    const female_result_fao2 = (14.818 * peso) + 486.6
                    this.female_result_fao = female_result_fao2.toFixed(2)
                }
                else if(idade >= 30 && idade <= 59){
                    const male_result_fao3 = (11.472 * peso) + 873.1
                    this.male_result_fao = male_result_fao3.toFixed(2)

                    const female_result_fao3 = (8.125 * peso) + 845.6
                    this.female_result_fao = female_result_fao3.toFixed(2)
                }
                else if(idade >= 60){
                    const male_result_fao4 = (11.711 * peso) + 587.7
                    this.male_result_fao = male_result_fao4.toFixed(2)

                    const female_result_fao4 = (9.082 * peso) + 658.5
                    this.female_result_fao = female_result_fao4.toFixed(2)
                }
            })
            calculo2()

            const calculo3 = (() => {
                const female_result_jeor = (10 * peso) + (6.25 * altura) - (5.0 * idade) - 161
                const male_result_jeor = (10 * peso) + (6.25 * altura) - (5.0 * idade) + 5
                this.female_result_jeor = female_result_jeor.toFixed(2)
                this.male_result_jeor = male_result_jeor.toFixed(2)
            })
            calculo3()

            const calculo4 = (() => {
                const cunningham = (22 * mlg) + 500
                const tinslayp = (24.8 * peso) + 10
                const tinslaymlg = (25.9 * mlg) + 254
                this.cunningham = cunningham.toFixed(2)
                this.tinslayp = tinslayp.toFixed(2)
                this.tinslaymlg = tinslaymlg.toFixed(2)
            })
            calculo4()

            switch (this.nome, this.sexo, this.idade, this.peso, this.mlg) {
                case null:
                    this.cadastro = false
                    break;
            
                default:
                    break;
            }

            const PreventErrors = () => {
                if (this.sexo != 'Masculino' && this.sexo != 'Feminino') {
                    this.cadastro = false
                    alert('Digite o sexo corretamente')
                }
                else {
                    this.cadastro = true
                }

            }
            PreventErrors()

        },

        ResetCadastro(){
            this.cadastro = false
            this.nome = null
            this.sexo = null
            this.idade = null
            this.peso = null
            this.altura = null
            this.mlg = null
            this.data = null
        },
        SalvarDados() {
            const data = {
                informacoes: {
                    nome: this.nome,
                    sexo: this.sexo,
                    idade: this.idade,
                    altura: this.altura,
                    peso: this.peso,
                    mlg: this.mlg,
                    data: this.data
                }
            }
            
            axios.post('http://localhost:3000/clientes', data)
            .then((response) => {
                alert('Dados salvos com sucesso!')
                return response
            })
            .catch((err) => {
                console.log(err);
            })

            this.ResetCadastro()
    }
}
}

</script>

<style scoped>


.principal{
    display: flex;
    justify-content: space-evenly;
    margin-top: 50px;
    width: 100%;
}

form{
    display: flex;
    flex-direction: column;
    width: 50vh;
    padding: 20px;
    background-color: rgba(47, 1, 62, 0.7);
    border-radius: 10px;
}
h1{
    padding-bottom: 10px;
    font-size: 35px;
    color: white;
}

input{
    padding: 10px 20px;
    font-size: 25px;
    color: white;
    border-color: black;
    background: rgb(48, 0, 66);
}

p{
    font-size: 25px;
    line-height: 30px;
}

span{
    color: white;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

h2{
    font-size: 45px;
    box-shadow: 0px 10px 40px -12px #00ff8052;
    border-radius: 10px;
    color: rgb(0, 182, 49);
}

.calcular{
    border: none;
    color: white;
    color: rgb(43, 0, 64);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-bottom: 10px;
}
.results{
    color: white;
    width: 100%;
    margin: auto 50px;
    background-color: rgba(29, 0, 38, 0.7);
    border-radius: 10px;
}

.button-enviar{
    border: none;
    padding: 10px 20px;
    color: rgb(43, 0, 64);
    background: #00ff88;
    border-radius: 10px;
    font-size: 25px;
}
.button-resetar{
    border: none;
    padding: 10px 20px;
    color: rgb(43, 0, 64);
    background: #00ff88;
    border-radius: 10px;
    font-size: 25px;
}
.save-data{
    border: none;
    width: 100%;
    padding: 10px 20px;
    color: rgb(43, 0, 64);
    background: #00ff88;
    border-radius: 10px;
    font-size: 25px;
}

button{
    cursor: pointer;
}

button:hover{
    box-shadow: 0px 10px 40px -12px #00ff8052;
    transform: scale(1.01);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}


.informacoes{
    display: flex;
    flex-direction: column;
}
.cadastro{
    margin-top: 20px;
    text-align: start;
    padding: 7vh;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: rgba(29, 0, 38, 0.7);
    color: white;
}

.reset{
    padding: 10px 20px;
}

.lineone{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px 20px;
    margin: 100px 20px;
}
.linetwo{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px 20px;
    margin: 100px 20px;
}
.linetree{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px 20px;
    margin: 100px 20px;
}
.harrys{
    margin-right: 280px;
}

.jeor{
    margin-right: 280px
}

.tinsplayp{
    margin-right: 280px;
}

.element{
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 60px;
}

img{
    position: relative;
}
</style>