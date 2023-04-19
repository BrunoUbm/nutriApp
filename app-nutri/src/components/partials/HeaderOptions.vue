<template>
    <header>
        <nav>
            <ul>
                <router-link class="li" to="/">Buscar</router-link>
                <router-link class="li" to="/pagecalculo">Calcular</router-link>
            </ul>
        </nav>
    </header>
</template>


<style scoped>
header{
    background-color: rgba(29, 0, 38, 0.7);
    width: 100%;
}
ul{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 10px 0px;
    color: white;
}
nav .li{
    text-decoration: none;
    font-size: 30px;
    color: white;
    padding: 7px 20px;
    border-radius: 7px;
    cursor: pointer;
}
.li:hover{
    transform: scale(1.03);
    color: rgb(43, 0, 64);
    background: #00ff88;
    box-shadow: 0px 10px 40px -12px #00ff8052;
    transition: .7s;
}

</style>