import { useState } from 'react';
import './App.css';

function App() {
  
  const [mode, setMode ]        = useState("WELCOME");
  const [id, setId]             = useState(0);  
  let content                   = null;
  const [topics,setTopics] = useState(
  [
    {id:1,  title:"Html",         body:"Html is ..."          },
    {id:2,  title:"Css" ,         body:"Css is ..."           },
    {id:3,  title:"Javascript"  , body:"Javascript is ..."    },
    {id:4,  title:"Ract"        , body:"React is ..."         }
  ]
  );

  const Header = (props)  => {
    return(
      <header><h1><a href='/' onClick={ (event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a>
      </h1>
      </header>
    );
  }
  
  const Nav = (props)=>{
    
    const lis =[];
    
    for(let i=0; i<props.topics.length;i++){
      let t = props.topics[i];    
      lis.push(<li key={t.id}><a  id={t.id} href="/"  onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(event.target.id);
      }}> {t.title}({t.id})</a></li>)
    }
  
    return(<nav><ol>{lis}</ol></nav>);

  }
  
  const Article = (props)=>{
    
    return(
      <>
      <h2>{props.title}</h2>
          {props.body}
          
      </>
    );
  }

  const Create = (props)=>{
    
    return(
      <>
      <h2>Create</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title,body);        
      }}>
      <p><label>제목</label> <input type="text" name="title" placeholder='title'/></p>
      <p><label>내용</label><textarea name="body" placeholder='body' ></textarea></p>
      <input type="submit" value="Create" onClick={(event)=>{
          
      }}/>
      </form>      
      </>
    );
  }

  const Update = (props)=>{
    const [title,setTitle] =useState(props.title);
    const [body,setBody] =useState(props.body);
    return(
      <article>
        <h2>Update</h2>
        <form onSubmit={(event)=>{
            event.preventDefault();
            const id    = event.target.id.value;
            const title = event.target.title.value;
            const body  = event.target.body.value;
            props.onUpdate(id,  title,  body);        
          }}>

        <input type="hidden" name="id"value={props.id}  />
        <p><label>제목</label>  <input type="text" name="title" placeholder='title' value={title} onChange={(event)=>{event.preventDefault();setTitle(event.target.value)}}/></p>
        <p><label>내용</label><textarea name="body" placeholder='body' onChange={(event)=>{event.preventDefault();setBody(event.target.value)}} >{body}</textarea></p>
        <input type="submit" value="Update" onClick={(event)=>{
            
        }}/>
        </form>      
      </article>
    );
  }

  
  if(mode ==="WELCOME"){
    content = <Article title="WEB"   body="Hello Web!!"  ></Article>;
  }else if(mode ==="READ"){    
    
    console.log("READ");

    for(let i=0; i<topics.length;i++) {                            
      
      const _t =topics[i];            
      //console.log(id +" " + _t.id);      
      if(Number(id) === _t.id){        
        content = 
        <>                    
          <Article title={_t.title}   body={_t.body}  ></Article>          
        </>
      }        
    }    
  }else if(mode ==="CREATE"){    
        content = <Create onCreate={(title,body)=>{
          //console.log(title); console.log(body);
          
          let newTopics = [...topics];//복제본 만들어서
          
          let idMax 
          if(topics.length===0){
            idMax=1;
          }else{
            //id max value get
            let idData = newTopics.map(function(v){
              return v.id;
            });
            idMax = Math.max.apply(null,idData)+1;
          }
          //복사본에 추가하고 다시 setTopics
          newTopics.push({id: (idMax) , title:title,  body : body});

          setTopics(newTopics);
          setMode("READ");
          setId(idMax);

        }} />
  }else if(mode ==="UPDATE"){    
    
    for(let i=0; i<topics.length;i++) {                            
      
      const _t =topics[i];            
      console.log(id +" " + _t.id);      
      if(Number(id) === _t.id){        
        
        content =  
          <Update id={_t.id} title={_t.title}   body={_t.body} onUpdate={(id,title,body)=>{
              //console.log(id);console.log(title); console.log(body);
              let newTopics =[...topics];
              
              for(let j=0; j<newTopics.length;j++) {
                  let _u =newTopics[j];   
                  if(Number(id)===_u.id){
                    _u.title =title;
                    _u.body  =body;
                    break;
                  } 
              }
              //console.log("newTopics" ,newTopics);

              setTopics(newTopics);
              setMode("READ");
              setId(Number(id));
          }} />
          break;
        }        
      }        
    }else if(mode ==="DELETE"){
      
      let newTopics =[]; 
      for(let i=0; i<topics.length;i++) {                            
        
        const _t =topics[i];
        //console.log(id +" " + _t.id);      
        if(Number(id) !== _t.id){        
            newTopics.push(_t);
        }        
      }
      
      setTopics(newTopics);
      setMode("WELCOME");
      setId(null);

    }
  
  return (
  <div className="App">
    <div>
      <Header title={"WEB"}  onChangeMode={()=>{                
        setMode("WELCOME");
      }} />
      
      <Nav topics={topics} onChangeMode={(_id)=>{        
        setMode("READ");
        setId(_id);
      }} />
      
      <br/> 
      {content}
      <ul>
        <li>
          <a href='/create' onClick={(event)=>{
            event.preventDefault();
            setMode("CREATE");
          }}>Create</a>
        </li>
        {mode==="READ" ? (<li>

        <a href='/update' onClick={(event)=>{
              event.preventDefault();
              setMode("UPDATE");
        }}>Update</a>       
       </li>) : ""}

       {mode==="READ" ? (<li>

      <button href='/' onClick={(event)=>{
            event.preventDefault();
            setMode("DELETE");
      }}>Delete</button>       
      </li>) : ""}       
       </ul>
    </div>
  </div>
  );
}

export default App;
