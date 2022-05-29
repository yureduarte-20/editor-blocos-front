import {  createGlobalStyle} from 'styled-components'
export default {
    primary: "#FFFFFF",
    primary_background:"#FBFBFB",
    primary_input_background: '#F1F1F1',
    secundary:'#004180',
    accent:'#F5850F',
    success:'#5CB660',
    failure:'#D32F2F'
}

export const Cores = createGlobalStyle`
    .white {
        color: #ffffff ;
    }
    .gray {
        color:#FBFBFB;
    }
    .gray-2 {
        color:#F1F1F1;
    }
    .gray-3{
        color:#737373;
    }
    .blue {
        color:#004180;
    }
    .orange {
        color:#F5850F;
    }
    .green {
        color:#5CB660;
    }
    .red {
        color:#D32F2F;
    }

`