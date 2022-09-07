<template>
    <div>
        
      <Navbar/>
    </div>
    <!-- hero -->
    <div class="w-full max-w-xl mt-20 ">
  <form class="bg-Emerald-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 " @submit.prevent="AddData">
    <div class="mb-4">
      <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
        Title
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text"  name="title" v-model="title">
    </div>
    <div class="mb-4">
      <label for="deskripsi" class="block text-gray-700 text-sm font-bold mb-2">
        Deskripsi
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text"  name="deskripsi" v-model="deskripsi">
    </div>

    <div class="mb-4" v-for="(tabs, index) in tag" :key="index">
        <label for="data tagger" class="block text-gray-700 text-sm font-bold mb-2">Tagger</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" name="tag" v-model="tag[index]">
    </div>

    <div class="mb-4">
      <label for="tag" class="block text-gray-700 text-sm font-bold mb-2">
        Tag
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text"  name="another" @keydown.tab.prevent="addTag" v-model="another">
    </div>

    <div class="flex items-center justify-between">
        <p v-if="feedback" class="text-red-700">{{feedback}}</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
        Simpan
      </button>
      
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">

  </p>
</div>

    
    <!-- end Hero -->
</template>
<script>
import Navbar from '../components/Navbar.vue';
import {collection, addDoc} from "firebase/firestore/lite";
import {db} from '../firebase/init'

export default {
    name: 'Index',
    data(){
        return{
            title: null,
            deskripsi : null,
            another: null,
            tag:[],
            feedback: null,
            
        }
    },
    methods:{
        async AddData(){
            
            const dbRef = collection(db, "aguiprojectaplikasi");

            const data = {
            title: this.title,
            deskripsi: this.deskripsi,
            tag: this.tag,

            };

            

            addDoc(dbRef, data)
            .then(docRef => {
                console.log(dbRef.id); 
                alert('Data Berhasil Disimpan')
                this.$router.push("/");   
            })
            .catch(error => {
                console.log(error);
                alert('Data Gagal Disimpan')
            })
           
            
        },


    
    addTag(){
        if(this.another){
            this.tag.push(this.another)
            console.log(this.tag)
            this.another = null
            this.feedback = null
        }
        else{
            this.feedback ="mohon isi data"
        }
    },
},

    components: { Navbar,  }
}
</script>
    
