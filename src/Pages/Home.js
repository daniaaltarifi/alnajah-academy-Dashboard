

import SideBar from '../component/SideBar.js';
import NavBar from '../component/NavBar.js';
import '../Css/home.css'
function ContainerFluidExample() {
  const length=[
    {
      id:1,title:"الأقسام",numLength:"2"
    },
    {
      id:2,title:"المواد",numLength:"2"
    }, {
      id:3,title:"الطلاب",numLength:"2"
    }, {
      id:4,title:"المعلمين",numLength:"2"
    },
    {
      id:5,title:"الكتب",numLength:"2"
    },
    {
      id:6,title:"المقالات",numLength:"2"
    }, {
      id:7,title:"التعليقات",numLength:"2"
    },
  ]
  return (
    <>
            <NavBar title="الاحصاءات"/>
<section className="margin_section">

    <div className="container-fluid ">
    <div className="row d-flex justify-content-center align-items-center">
      {length.map((card,id)=>(

      <div className="col-lg-3 col-md-6 col-sm-12 box_home"key={card.id}>
        <div className="d-flex">

        <img src={require('../assets/department.png')} alt="department" className="img-fluid icon_home" />

     <p className="title_section_home">{card.title}</p>
        </div>
     <p className="num_length_home">4</p>
      </div>
      ))}
      
     
    </div>
  </div>
  </section>

    </>
  );
}

export default ContainerFluidExample;