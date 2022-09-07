<template >
    <div>
        <Navbar/>
    </div>


     <!-- hero -->
     <div class="w-full max-w-xl mt-20">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " @submit.prevent="UpdateData">
            <div class="mb-4">
            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
                Title
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text"  name="title" v-model="smoothieinfo.title">
            </div>
            <div class="mb-4">
            <label for="deskripsi" class="block text-gray-700 text-sm font-bold mb-2">
                Deskripsi
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text"  name="deskripsi" v-model="smoothieinfo.deskripsi">
            </div>

            <div class="mb-4" v-for="(tabs, index) in smoothieinfo.tag" :key="index">
                <label for="data tagger" class="block text-gray-700 text-sm font-bold mb-2">Tagger</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" name="tag" v-model="smoothieinfo.tag[index]">
            </div>

            <div class="mb-4">
            <label for="tag" class="block text-gray-700 text-sm font-bold mb-2">
                Tag
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text"  name="another" @keydown.tab.prevent="addTag" v-model="smoothieinfo.another">
            </div>

            <div class="flex items-center justify-between">
 
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                Update
            </button>
            
            </div>
        </form>
        <p class="text-center text-gray-500 text-xs">

        </p>
    </div>



</template>



<script>
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore/lite";
import {db} from '../firebase/init'
import Navbar from '../components/Navbar.vue';

const newLocal = "aguiprojectaplikasi";

export default {
    name: "Edit",
    components: { Navbar },
    data(){
        return{
            title: null,
            deskripsi: null,
            feedback: null,
            tag: [],
            smoothie:[],
            smoothies: [],
            smoothieinfo: {
                title: null,
                deskripsi: null,
                tag: null,
            },
            idreff:[]
            
            
            
           
        }
        
    },
    methods:{
        async UpdateData(){
            
            const docData ={
                title: this.smoothieinfo.title,
                deskripsi: this.smoothieinfo.deskripsi,
                tag: this.smoothieinfo.tag,
            }

            await setDoc(doc(db, newLocal, this.idreff), docData)
            this.$router.push("/");   
            
            },

            
    
        

    
   addTag(){
        if(this.smoothieinfo.another){
            this.smoothieinfo.tag.push(this.smoothieinfo.another)
            console.log(this.tag)
            this.smoothieinfo.another = null
            this.feedback = null
        }
        else{
            this.feedback ="mohon isi data"
        }
    },


    },


    async created(){
        

        const q = query(collection(db, newLocal), where("title", "==", this.$route.params.title ));

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        // console.log(`${doc.id} => ${doc.data()}`)
        let smoothie =doc.data() 
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
        this.idreff= doc.id;
        this.smoothieinfo.title = smoothie.title;
        this.smoothieinfo.deskripsi = smoothie.deskripsi;
        this.smoothieinfo.tag = smoothie.tag;
        });
    },

}
</script>
