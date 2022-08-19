const isAuthenticatedGuard = async (to, from, next) => {
    return new Promise(() => {
        const random = Math.random() * 100
        if (random > 50) {
            console.log('Autenticado - isAutenthicatedGuard')
            next()
        } else {
            console.log(random, 'Bloqueado por isAutenthicatedGuard')
            next({ name: 'pokemon-home' })
        }
    })
}

export default isAuthenticatedGuard