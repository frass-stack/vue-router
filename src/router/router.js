import { createRouter, createWebHashHistory } from 'vue-router'
// 1. Define route components.
// These can be imported from other files

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: '/',
    redirect: '/pokemon'
  },
  {
    path:'/pokemon',
    name:'pokemon',
    component: () => import(/*webpackChunkName:"PokemonLayout"*/ '../modules/pokemon/layouts/PokemonLayout'),
    children: [
      { 
        path: 'home',
        name: 'pokemon-home', 
        component: () => import(/*webpackChunkName:*/ '../modules/pokemon/pages/ListPage') 
      },
      { 
        path: 'about', 
        name: 'pokemon-about',
        component: () => import(/*webpackChunkName:*/ '../modules/pokemon/pages/AboutPage') 
      },
      { 
        path: 'pokemonid/:id',
        name: 'pokemon-id',
        component: () => import(/*webpackChunkName:*/ '../modules/pokemon/pages/PokemonPage'),
        props: ( route ) =>{
          const id = Number(route.params.id)
          return isNaN( id )? {id:1}:{ id }
        }
      },
      {
        path: '',
        redirect: { name: 'pokemon-about' }
      }
    ]
  },
  {
    path:'/dbz',
    name:'dbz',
    component: () => import(/*webpackChunkName:"DragonBallLayout"*/ '../modules/dbz/layouts/DragonBallLayout'),
    children: [
      { 
        path: 'characters',
        name: 'dbz-characters', 
        component: () => import(/*webpackChunkName:*/ '../modules/dbz/pages/Characters') 
      },
      { 
        path: 'about', 
        name: 'dbz-about',
        component: () => import(/*webpackChunkName:*/ '../modules/dbz/pages/About') 
      },
      {
        path: '',
        redirect: { name: 'dbz-characters' }
      }
    ]
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: () => import(/*webpackChunkName:*/ '../modules/shared/pages/NotPageFound') 
  },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})


//Guard Global => Sincrono

// router.beforeEach( (to, from, next) => {
//   const random = Math.random()*100
//   if(random > 50){
//     console.log('Autenticado')
//     next()
//   }else{
//     console.log(random, 'Bloqueado por el BeforeEach Guard')
//     next({ name: 'pokemon-home' })
//   }
// })


//Guard Global => Asincrono
const canAccess = () => {
  return new Promise( (resolve) => {
    const random = Math.random()*100
    if(random > 50){
      console.log('Autenticado - canAccess')
      resolve(true)
    }else{
      console.log(random, 'Bloqueado por el BeforeEach Guard - canAccess')
      resolve(false)
    } 
  })
}

router.beforeEach( async (to, from, next) => {
  const authorized = await canAccess()

  authorized
    ? next()
    : next({ name: 'pokemon-home' })
})


export default router