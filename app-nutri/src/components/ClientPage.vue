<template>
    <div>
        <HeaderOptions />
        <div class="input-busca">
            <input class="user" type="text" v-model="busca" placeholder="Digite o nome do cliente">
            <button class="acess" @click="AcessAcount">Buscar</button>
        </div>
        <div class="align-dados">
            <div v-show="render === true" v-for="(dado, i) in dados" :key="dado.id" class="dados">
                <p><span>Nome: </span>{{ dado.informacoes.nome }}</p>
                <p><span>Idade: </span>{{ dado.informacoes.idade }}</p>
                <p><span>Altura: </span>{{ dado.informacoes.altura }}</p>
                <p><span>Peso: </span>{{ dado.informacoes.peso }}</p>
                <p><span>Gênero: </span>{{ dado.informacoes.sexo }}</p>
                <p><span>Massa livre de gordura: </span>{{ dado.informacoes.mlg }}</p>
                <p><span>Data do calculo: </span>{{ dado.informacoes.data }}</p>
                <button class="delet" @click="DeletComent(del, i)">Excluir</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HeaderOptions from '../components/partials/HeaderOptions.vue';
export default{
    name: 'LoginPage',
    components: {
        HeaderOptions
    },
    data() {
        return {
            render: false,
            busca: null,
            nome: null,
            idade: null,
            altura: null,
            peso: null,
            sexo: null,
            mlg: null,
            date: null,
            dados: [],
            remove: [],
            clear: []
        }
    },
    methods:{
        AcessAcount(a){
            a.preventDefault()
            const ClearInput = () => {
                this.clear.push(this.busca)
                if (this.clear.length > 1) {
                    this.clear.shift()
                }
                this.busca = null
            }
            ClearInput()


            fetch('http://localhost:3000/clientes')
            .then((response) => {
                const json = response.json()
                return json
            })
            .then((data) => {
                const busca = data.filter((a) => {
                    if (a.informacoes.nome === this.clear[0]) {
                        this.render = true
                        this.nome = a.informacoes.nome
                        this.idade = a.informacoes.idade
                        this.altura = a.informacoes.altura
                        this.peso = a.informacoes.peso
                        this.sexo = a.informacoes.sexo
                        this.mlg = a.informacoes.mlg
                        this.date = a.informacoes.data
                    }
                    return a.informacoes.nome === this.clear[0]
                })
                this.dados = busca
                if (this.dados.length === 0) {
                    alert('Paciente não encontrado')
                }
            })
            .catch((err) => {
                console.log(err);
            })
        },
        DeletComent(del, i) {
            const TransitionData = () => {
                this.remove.push(this.dados[i])
                this.dados.splice(i, 1)
            }
            TransitionData()
            
            this.remove.findIndex((obj) => {
                axios.delete(`http://localhost:3000/clientes/${obj.id}`)
                .then((response) => {
                    return response
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        }
    }
}
</script>

<style scoped>
.input-busca{
    margin-top: 50px;
    display: flex;
    width: 100%;
    justify-content: center;
}

.user {
    font-size: 30px;
    padding: 10px 30px;
    width: 70vh;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: none;
    color: white;
    border-color: black;
    background: rgb(48, 0, 66);
}
.acess{
    color: rgb(18, 0, 27);
    background: #00ff88;
}
.acess:hover{
    box-shadow: 0px 10px 40px -12px #00ff8052;
    transform: scale(1.01);
}

.delet{
    color: rgb(231, 184, 255);
    background: #006636;
    border-radius: 5px;
    margin-top: 20px;
}
.delet:hover{
    box-shadow: 0px 10px 40px -12px #00a25152;
    transform: scale(1.02);
}


button{
    font-size: 30px;
    padding: 10px 30px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: none;
    cursor: pointer;
}

.dados{
    width: 500px;
    margin: 50px;
    font-size: 30px;
    padding: 30px;
    background: #00ff88;
    box-shadow: 0px 10px 40px -12px #00ff8052;
    border-radius:10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}


span{
    color: rgb(72, 0, 109);
}

.align-dados{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>