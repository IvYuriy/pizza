<template>
    <div id="app1">
  <div class="page-container">
    <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      app
    >
    <div class="title-order" v-if="!list"><h2>ничего не заказано</h2></div>
      <v-list dense>
        <md-list v-for="i in list"
          :key="i.id">
          <md-list-item>
            <img class="small-img" :src="`${i.image}`" alt="none">

          </md-list-item>
          <md-list-item>
            <span class="md-list-item-text"><h2>weight:</h2><h4>{{i.selected}}(g)</h4></span>
            <span class="md-list-item-text"><h2>price:</h2> <h4>{{i.price}}₽</h4></span>
          </md-list-item>
<v-btn
            absolute
            color="orange"
            class="white--text"
            fab
            small
            right
            bottom
            @click="del(i.id)"
          >
            <v-icon>remove</v-icon>
          </v-btn>
        </md-list>

        <v-btn v-if="list" block large top @click="pay" depressed color="blue-grey" class="white--text">цена: {{orderCost}}₽</v-btn>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar class="toolbar"
      color="green-grey"

      dark
      fixed
      app
    >
      <v-toolbar-title >
<h1>Pizza</h1>
  </v-toolbar-title>




      <v-spacer></v-spacer>
      </v-toolbar-side-icon>
    </v-toolbar>

    <v-content  v-cloak>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <md-card md-with-hover
              v-for="ingredient in ingredients"
              :key="ingredient.name">
              <md-ripple>
              <md-card-header>
                <md-card-header-text>




<div >
  <div class="md-title">{{ingredient.name}} {{ingredient.cost}}₽ </div>
  <div class="md-subhead">current price:{{ingredient.cost*ingredient.selected*0.1}}₽</div>
</div>



                </md-card-header-text>

              </md-card-header>
                <md-card-media>
                  <img :src="`${ingredient.image}`" alt="none" class="img">
                </md-card-media>
              <md-card-actions>
                <div class="group">
                    <input type="text" required v-model="ingredient.selected">
                    <label >Введите требуемый вес (гр)</label>
                </div>
              </md-card-actions>
              <div class="buttons">
                  <md-button @click="remove(ingredient.id)"  class="md-raised ">удалить</md-button>
                  <md-button @click="add(ingredient.id)"  v-bind:class="{ 'active': ingredient.active}"  class="md-raised ">добавить</md-button>
              </div>
            </md-ripple>
            </md-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer color="blue-grey" class="white--text" app>
      <span>Vue cli</span>
      <v-spacer>Пицерия</v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
    </v-app>
  </div>



</div>
</template>








<script>
import eventBus from '../../src/eventBus.js'



  export default {
      name: 'PersistentMini',
    data: () => ({
      drawer: true,
      props: ['product'],
      drawerRight: true,
      right: null,
      left: null,
      menuVisible: false,
      ingredients: [
          {id: 0, name: 'Салями (Мраморная)(100гр)', cost: 90, image:'https://upload.wikimedia.org/wikipedia/commons/1/18/Salami_aka.jpg', selected: null,
        		active:false},
          {id: 1, name: 'Пармезан(Италия)(100гр)', cost: 55, image:'https://ichef.bbci.co.uk/news/976/cpsprodpb/ABBB/production/_105436934_c6128ed2-1e89-4653-abde-f1092a82e2be.jpg', selected: null ,
        		active:false},
          {id: 2, name: 'Грибы(Вешенки)(100гр)', cost: 150, image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFmLQb3rUdVkXDdWVV40wSpxar-CPVvAKcnivg0CqbBX1RJOK6', selected: null,
        		active:false},
            {id: 3, name: 'Ананас(Маринованный)(100гр)', cost: 110, image:'https://olivin-tm.ru/wp-content/uploads/2018/12/2a673e91169c00be36f188ba6c25ccf5.jpg', selected: null,
        		active:false},
            {id: 4, name: 'тесто (радиусом-30)', cost: 80, image:'https://img07.rl0.ru/eda/c620x415i/s1.eda.ru/StaticContent/Photos/120131085053/171027184149/p_O.jpg', selected: null,
              active:false},
                {id: 5, name: 'тесто (радиусom-45)', cost: 100, image:'https://img07.rl0.ru/eda/c620x415i/s1.eda.ru/StaticContent/Photos/120131085053/171027184149/p_O.jpg', selected: null,
                  active:false}

      ],
      order:[],
      list:null,
      orderCost:0,
    }),
    props: {
    source: String
  },
    methods: {
    	add: function(id){
            id.active = !id.active;
    }	},
    methods: {


      add :function (id) {
        if(parseInt(this.ingredients[id].selected)){
          this.list = []
            if (id in this.order){
              this.order[id].selected += Number.parseInt(this.ingredients[id].selected);
              this.order[id].price += this.ingredients[id].selected * this.ingredients[id].cost *0.01;
            }
            else{
              this.order[id] = ({id: this.ingredients[id].id, selected: Number.parseInt(this.ingredients[id].selected), price: this.ingredients[id].selected * this.ingredients[id].cost *0.01, image: this.ingredients[id].image});
            }
            this.order.forEach(element => {
          if(element != undefined){
            this.list.push(element);
          }
        });
        this.orderCost += Number.parseFloat(this.ingredients[id].selected * this.ingredients[id].cost *0.01);
        }
        this.ingredients[id].selected = null
      },
      del:function(id){
        this.list = []
        this.orderCost -= Number.parseFloat(this.order[id].price);
        this.order[id] = null;

         this.order.forEach(element => {
          if(element != undefined){
            this.list.push(element);
          }
        });
           // eslint-disable-next-line no-console
           console.log(this.order,this.list,id);
      },
      remove :function (id) {
        if(parseInt(this.ingredients[id].selected)){
          this.list = []
            if (id in this.order){
                this.order[id].selected -= Number.parseInt(this.ingredients[id].selected);
                this.order[id].price -= this.ingredients[id].selected * this.ingredients[id].cost *0.01;
                this.orderCost -= Number.parseFloat(this.ingredients[id].selected * this.ingredients[id].cost *0.01);
            }
            else{
              alert('Этот товар еще не был добавлен');
            }
            this.order.forEach(element => {
          if(element != undefined){
            this.list.push(element);
          }
        });
        }

        this.ingredients[id].selected = null
      },
      pay:function(){
        alert('Функция в данный момент не доступна:)');
      }
    },
  }
</script>

<style lang="scss" scoped>
.toolbar{
  opacity: 0.8;
}

  .md-app {
    min-height: 800px;
    border: 1px solid rgba(#900, .12);
  }
   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 225px);
  }
  .md-primary{
      background: rgb(193, 203, 238);
  }
  .md-card {
    width: 282px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
color: #123cda;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.14), 0 3px 4px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
  }
.img{
    height: 100px !important;
    width: 75% !important  ;
}
.title-order{
  display: flex;
  height: 640px;
    color: #5864AE;
}
.title-order h2{
  padding-top:15px;
  margin: 0 auto;
}
  .group {
    position: relative;
    margin-top: 10px;
    margin-bottom: 30px;
  }
.buttons{
 width: 100%;
 padding-bottom: 10px;
}
.md-raised{
  width: 40%;
  box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px 0 rgba(0,0,0,0.20);
}
@import url(https://fonts.googleapis.com/css?family=Cookie);

[v-cloak] {
  display: none;
}

input {
  width: 250px;
  font-size: 16px;
  padding: 10px;
  display: block;
  border: none;
  border-bottom: 1px solid #ccc;
}
input:focus {
  outline: none;
}
label {
  color: #999;
  font-size: 18px;
  position: absolute;
  pointer-events: none;
  left: 10px;
  top: 15px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
input:focus ~ label, input:valid ~ label {
  top: -10px;
  font-size: 14px;
  color: #5264AE;
}
.md-drawer.md-active{
box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 3px rgba(0,0,0,0.12), 0 400px 5px 0 rgba(0,0,0,0.20);
}

.md-accent{
 background: rgb(248, 105, 105);
 box-shadow: 0 2px 4px 0 rgba(0,0,0,0.14), 0 3px 4px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
}

.small-img{
  height: 100px !important;
  width: 100%;
}
.md-list{
  width: 90%;
  margin-left: 5%;
  box-shadow: 0 2px 4px 0 rgba(1,0,0,0.14), 0 3px 4px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
  margin-top: 10px;
}
.md-list-item-text{
  text-align: center;
}


</style>
