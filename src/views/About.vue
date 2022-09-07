<template >
  
        <Navbar/>
        <input type="text" v-model="searchTerm" class="input">
       <div v-for="post in filteredPos" :key="post.id" class="post"></div>
       
    <div class="card mt-10">
        <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            <!--Card 1-->
            <div class="rounded overflow-hidden shadow-lg" v-for="smoothie in smoothies" :key="smoothie">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{{smoothie.title}}</div>
                <p class="text-gray-700 text-base">
                {{smoothie.deskripsi}}
                </p>
            </div>
            <div class="px-6 pt-4 pb-2" v-for="(tager,index) in smoothie.tag" :key="index"> 
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" >{{tager}}</span>
            </div>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded" @click="deleteSmoothie(smoothie.id)">
            Delete
            </button>
           
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" >
                <router-link :to="{ name: 'edit', params: { title: smoothie.title } }" >Edit </router-link>
                
           
            </button>

            
            </div>
            
        </div>
    </div>

 
   
</template>
<script>
import { collection, doc, getDocs, deleteDoc} from "firebase/firestore/lite";
import {db} from '../firebase/init'
import Navbar from '../components/Navbar.vue';
export default {
    name: "About",
    components: { Navbar },
    data(){
        return{
            smoothies: [
          
        ]
        }
        
    },
    methods:{
        
        async deleteSmoothie(id){

          

            // await deleteDoc(collection(db, "aguiprojectaplikasi")

        //    db.collection('aguiprojectaplikasi').doc(id).delete()
        //    .then(()=>{
            
        //    })

        await deleteDoc(doc(db,"aguiprojectaplikasi",id))
         this.smoothies = this.smoothies.filter(smoothie=>{
                return smoothie.id !=id
            })





        }
    },

    async created(){
        const querySnapshot = await getDocs(collection(db, "aguiprojectaplikasi"));
        querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        // console.log(`${doc.id} => ${doc.data()}`)
        let smoothie =doc.data() 
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
        });
    }

   

  
}
</script>
