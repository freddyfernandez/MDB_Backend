//SIN TYPESCRIPT ESSIN EL EXPORT
const getMenuFrontend = (role='USER_ROLE')=>{
    const menu =  [
        {
            titulo: 'Dashboard',
            icono:'mdi mdi-gauge',
            submenu:[
              
                {titulo:'Votacion',url:'votacion'},
                {titulo: 'Graficas',url:'grafica1'},
                {titulo: 'rxjs',url:'rxjs'},
                {titulo: 'ProgressBar',url:'progress'},
                {titulo: 'Promesas',url:'promesas'}
            ]  
        },
        
        {
            titulo: 'Mantenimiento',
            icono:'mdi mdi-folder-lock-open',
            submenu:[
                
                {titulo: 'Hospitales',url:'hospitales'},
                {titulo: 'Medicos',url:'medicos'},
          
            ]  
        },
    ];

    if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({titulo:'Usuarios',url:'usuarios'})
        menu[1].submenu.unshift({titulo:'Conocimientos',url:'conocimientos'})
    }
    return menu;
}

module.exports={getMenuFrontend};