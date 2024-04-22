import { supabase } from "@lib/supabase"

const { data, error } = await supabase
    .from('Productos')
    .select(`
        id_producto,
        nombre_producto,
        id_marca (
            nombre_marca
        ),
        descripcion,
        precio,
        img_producto`)
    
    if (error) {
        console.log('error', error)
    }