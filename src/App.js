//-----------//
// portfolio //
//-----------//
// cv-link--   https://drive.google.com/file/d/1t6QMBNoItsMYr8nPaZWmmevfx4dFRdSh/view?usp=sharing
//----------------------------------------------------------------------------------
// vk-portfolio-dev.vercel.app
//-----------------------------------------------------------------------------------------------------
import "./styles.css";

//------------------------------------------------------------
import { auth, provider, db } from "../src/firebasebkend";

//-------------------------------------------------------------------
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
//-------------------------------------------------------------------------------------------------
// import pdfFile from "./cv.pdf";

// for inbrowser pdf viewer (also import stylesheet to manage its css)
// import { Document, Page } from "react-pdf";

// import * as pdfjsLib from "pdfjs-dist/build/pdf";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const pdfFile =
  "https://drive.google.com/file/d/1t6QMBNoItsMYr8nPaZWmmevfx4dFRdSh/view?usp=sharing";

//-------------------------------------------------------------------------------------------------
import { signInWithPopup } from "firebase/auth"; // for login pg2
import { signOut } from "firebase/auth"; // for logout navbar
import {
  addDoc, // to add data in firebase cloud pg3
  collection, // access the collection created in firebase db
  getDocs, // get the data frm the collection n display in homepage
  deleteDoc, //  delete using deleteDoc,
  doc, //  doc used to access n delete indivisual data(id) frm the collection
  serverTimestamp, // to add timestamp
  query, // in useeff <Chat/> query(collectiondb, where("room"==room))
  where, // to specify query so we only get those messages for the room where we are where("room"=room), other similar middlewheres are available like sum, average, orderby, count, limit that u can check out in console query builder
  onSnapshot, // listen to changes in db which we can use in <Chat/> useEffect
  orderBy, // another middlewere that rearranges the query in ascending/decending order based on passed condition
} from "firebase/firestore";
//----------------------------------------------------------------------------------
import ReactPlayer from "react-player"; // for  video

//---------------------------------------------------------------------------------------------

import { useState, useEffect, useRef, useMemo } from "react";

//------------------------------------------------------------------------------------------------------
export default function App() {
  // const [isAuth, setIsAuth] = useState(false); // passing setisauth as prop to login page
  const [isAuth, setIsAuth] = useState(localStorage.getItem("user"));
  // now even when u refresh, it will be logged in means if user doesntexist in memory/not loggrfin/ logged out{ in navbar-> localStorage.removeItem("user");}, it will return false on "" empty str
  //-----------------------------------------------------------------------------------------------------
  // console.log("auth is : ", auth);
  //--------------------------------------------------------------------------------
  const [mobnav, setMobnav] = useState(false);
  const [mobnavtgl, setMobnavtgl] = useState(false);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 840 is the limit
  //---------------------------------------------------------------------------

  useEffect(() => {
    //-------------------------------------------------------------
    if (window.innerWidth < 840) {
      // check first window sie for mobile nav or not as soon as app loads
      setMobnav(true);
    } else {
      setMobnav(false);
    }

    //-------------------------------------------------------------
    const handleResize = () => {
      // when manually browser size changed, we added an addeventlistener
      // setWindowWidth(window.innerWidth);
      if (window.innerWidth < 840) {
        setMobnav(true);
      } else {
        setMobnav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //----------------------------------------------------------------
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            mobnav={mobnav}
            setMobnav={setMobnav}
            mobnavtgl={mobnavtgl}
            setMobnavtgl={setMobnavtgl}
            // windowWidth={windowWidth}
            // setWindowWidth={setWindowWidth}
          />
          <hr />
          <Routes>
            <Route path="/" element={<Page1 isAuth={isAuth} />} />

            <Route path="/Contact" element={<Page3 isAuth={isAuth} />} />
            <Route path="/About" element={<Page4 />} />
            <Route path="/Resources" element={<Page5 isAuth={isAuth} />} />

            <Route path="/Projects" element={<Projects />} />
            <Route
              path="/Admin"
              element={<Page2 isAuth={isAuth} setIsAuth={setIsAuth} />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

//------components(create indivisual modules for each and import in app.js instead of doing like this all in one page)---------------------------------------------------------------------------------
function Navbar({
  isAuth,
  setIsAuth,
  mobnav,
  setMobnav,
  mobnavtgl,
  setMobnavtgl,
  // windowWidth,
  // setWindowWidth,
}) {
  // let navref = useRef(null);
  let navigate = useNavigate();

  function logoutt() {
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        localStorage.removeItem("user");
        console.log("logout success");
        alert("logout success");
        navigate("/Admin"); // redirect to login page after logout
      })
      .catch((error) => {
        alert("logout error: ", error);
      });
  }

  return (
    <div className="navmaindiv">
      {/* ---------put condition if windowWidth<840 then show this button------------------------------------------- */}
      {
        // windowWidth < 840

        mobnav && (
          // mobnav
          <li className="monblimain" onClick={() => setMobnavtgl(!mobnavtgl)}>
            <span className="mobnavbtn">
              {/* mobile-navbar:{JSON.stringify(mobnavtgl)} */}
              {/* ↕ */}
              {mobnavtgl === false ? "☰" : "↩"}
            </span>
          </li>
        )
      }
      {mobnavtgl && (
        <ul className="mobnavul">
          <li className="mobnavli">
            <NavLink to="/">⚛Home</NavLink>
          </li>
          <li className="mobnavli">
            <NavLink to="/Projects">⚛Projects</NavLink>
          </li>

          <li className="mobnavli">
            <NavLink to="/Contact">⚛Contact</NavLink>
          </li>
          <li className="mobnavli">
            <NavLink to="/Resources">⚛Resources</NavLink>
          </li>
          <li className="mobnavli">
            <NavLink to="/About">⚛About</NavLink>
          </li>
          {isAuth && (
            <li className="mobnavli">
              <NavLink to="/Admin">⚛Admin</NavLink>
            </li>
          )}
          {isAuth && (
            <button id="lgotbtn" onClick={logoutt}>
              ⚛ LogOut
              {/* {windowWidth} */}
            </button>
          )}
        </ul>
        // can also use ref event so clicked anywhere outside ul will close te mobile navbar
        // can even make entire navbar floating
      )}
      {/* ------------put condition if windowWidth >= 840 then show this full nav else buttonnav---------------------------------------- */}
      {
        // windowWidth >= 840
        !mobnav && (
          <nav>
            <NavLink to="/">⚛Home</NavLink>
            <NavLink to="/Projects">⚛Projects</NavLink>
            {/* {props.isAuth && (
            <button id="lgotbtn" onClick={logoutt}>
              ⚛LogOut{windowWidth}
            </button>
          )} */}

            <NavLink to="/Contact">⚛Contact</NavLink>
            <NavLink to="/Resources">⚛Resources</NavLink>
            <NavLink to="/About">⚛About</NavLink>
            {isAuth && <NavLink to="/Admin">⚛Admin</NavLink>}
            {isAuth && (
              <button id="lgotbtn" onClick={logoutt}>
                ⚛LogOut
                {/* {windowWidth} */}
                {/* {JSON.stringify(mobnav)} */}
              </button>
            )}
            {/* {JSON.stringify(windowSize)} */}
          </nav>
        )
      }
    </div>
  );
}
//-------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------

// //--------------------------------------------------------------------------
function Page1({ isAuth }) {
  return (
    <div>
      <u></u>
      <h1>
        <u className="hvr">V. Kumar</u> <br />
        <small>
          <small>
            <small className="hvr">kumardev@tuta.io</small>
          </small>
        </small>
      </h1>

      <i className="hvr">
        <u>(B.Tech, ECE, UPTU [12-16])</u>
      </i>
      <hr />
      <h1>
        🥸 <u className="hvr">Portfolio </u> ☺
      </h1>

      <hr />
      <h1>
        <u className="hvr">Skills</u>
      </h1>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>
          React and associated libraries like ReactRouterDom, ReactHookForm/Yup
          etc.
        </li>
        <li>
          <b>Redux(rtk): </b>middlewares(thunk, logger), slices(& reducers),
          store, useSelector, useDispatch (react-redux hooks)
        </li>
        <li>AJAX & REST apis, Axios/ReactQuery</li>
        <li>
          <b>Firebase: </b>
          <br /> middlewares/methods: serverTimestamp, where, onSnapshot, query,
          orderBy etc
        </li>
        <li>Socket.io (with cors & nodemon)</li>
        <li>Node.js</li>
        {/* <li>Express</li> */}
        <li>
          {" "}
          <b>Hooks:</b> useState, useEffect, useLayoutEffect, useRef, useMemo,
          useCallback, useReducer, useContext, useDeferredValue, useTransition
          etc.{" "}
        </li>
        <li>
          {" "}
          <b>IDE: </b> VS Code, CodeSandbox{" "}
        </li>
      </ul>

      <hr />
      <h1>
        <u className="hvr">Education</u>
      </h1>
      <ul>
        <li>B.Tech, ECE (UPTU [12-16])</li>
        <li>XII (ISC [2011])</li>
        <li>X (ICSE [2009])</li>
      </ul>
      <hr />
      <h1>
        <u className="hvr">Interests</u>
      </h1>
      <ul>
        <li>Reading</li>
        <li>Music</li>
        <li>Science Fiction</li>
      </ul>
      <hr />
      <h1>
        <u className="hvr">Download CV</u>
      </h1>
      {/*      
      // for inbrowser pdf viewer (also import stylesheet to manage its css)
      <div>
        <Document file={pdfFile}>
          <Page pageNumber={1} />
        </Document>
      </div> */}

      <button
        className="sml"
        onClick={() => {
          // Create a temporary anchor element
          const link = document.createElement("a");
          link.href = pdfFile;
          // link.setAttribute("download", "cv.pdf");
          link.setAttribute("target", "_blank"); // open in new page
          // Append the anchor element to the body
          document.body.appendChild(link);

          // Click the anchor element to trigger the download
          link.click();

          // Remove the anchor element from the body
          document.body.removeChild(link);
        }}
      >
        Click me!
      </button>
      <hr />
    </div>
  );
}
//---------------------------------------------------------------------------------------------------

// //--------------------------------------------------------------------------
function Page2({ isAuth, setIsAuth }) {
  // admin login page
  const [dta, setDta] = useState([]);
  const [lnk, setLnk] = useState("");
  const [title, setTitle] = useState("na");
  const [catg, setCatg] = useState("");
  function signInWithGoogle() {
    signInWithPopup(auth, provider) // can use other methods like  redirect, whatever may seem convinient to u
      .then((result) => {
        const user = result.user;
        // console.log("user is : ", user);
        if (auth.currentUser.uid === "ep9cVvbOCBVQXzqB7Owy7V71ia23") {
          alert("admin login success");
          localStorage.setItem("user", JSON.stringify(user));
          // creating an instance in local storage so if user refreshes the page or closes browser n opens back they are still logged in
          setIsAuth(true);
          // console.log("auth.currentUser.uid: ", auth.currentUser.uid)
        } else {
          alert("Wrong credentials!");
          // setIsAuth(false);
        }
      })
      .catch((error) => {
        console.log("error login: ", error);
        alert("login error ");
      });
  }
  //--------------------------------------------------
  useEffect(() => {
    var unsubscribecleanupsnpsht; // declearing it here so lexical scoping issue does not occor
    // this useEffect will immidiatly run once admin logins and set the state setDta with data
    async function getPosts() {
      const postcollectiondbmsg = collection(db, "posts");
      const msgquery = query(
        postcollectiondbmsg,
        where("category", "==", "messages"),
        orderBy("created", "asc")
        /* will give error first time, need to manually create query frm given link in console
        @firebase/firestore: Firestore (10.8.1): Uncaught Error in snapshot listener: FirebaseError: [code=failed-precondition]: The query requires an index. You can create it here: https://console.firebase.google.com/v1/r/project/basechat-5fbeb/firestore/indexes?create_composite=Ck9wcm9qZWN0cy9iYXNlY2hhdC01ZmJlYi9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvbWVzc2FnZXMvaW5kZXhlcy9fEAEaCAoEcm9vbRABGgsKB2NyZWF0ZWQQARoMCghfX25hbWVfXxAB
        it will take 1 min to build, now working */
      );
      unsubscribecleanupsnpsht = onSnapshot(msgquery, (snapsht) => {
        // console.log("new message", snapsht); // snpsht is big obj with many data, we now extract only what we need
        setDta(snapsht.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // now only room1 messages visible
      });
      //  -------------------------------------------------------------------
      //----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    }
    getPosts();
    //  }, [msg]); // now no need for msg dependency to run useEffect again and again and getDocs everytime we send message as snapshot method doing same thing along with listening to query where we only take in data where("room"=room), it works even faster now
    return () => {
      unsubscribecleanupsnpsht(); // cleanup
    };
  }, [isAuth]);
  // //--------------------------------------------------------
  async function delpost(id) {
    // delete using deleteDoc, "doc" specifies which doc u wanna delete
    // doc takes 3 args- db, collection name and doc id u want to delete
    const doctodel = doc(db, "posts", id); // we recieve id frm dta obj, each post has a post id as a key in dta.map((post) that we can pass via button onClick={()=>delpost(post.id)}
    await deleteDoc(doctodel);
    alert("message deleted");
    //---------------------------------------------------------------------------------------------------------
  }
  //-------------------------------------------------
  async function addpost() {
    //---------------------
    let dttm = new Date().toLocaleString();
    //
    try {
      if (!lnk.trim() || !catg.trim()) {
        alert("enter link and category");
        return;
      } else {
        const postcollectiondb = collection(db, "posts"); // creating a collection in database and passing in the db(getFirestore) and collection name ("posts"/xxxx as we created in firebase database)
        await addDoc(postcollectiondb, {
          m1: lnk,
          m2: title,
          dttm: dttm,
          created: serverTimestamp(),
          category: catg, // Category will be used to access db with "where" middlewere
        });
        //-------------------------------
        // clear the input

        //--------------------
        alert("data updated in db");
        setLnk("");
        setCatg("");
        setTitle("na");
      }
    } catch (err) {
      alert("error occored: ");
    }
  }
  //------------------------------------------------------------
  return (
    <div>
      {!isAuth && (
        <button id="lgnbtn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      )}
      {isAuth && (
        <div>
          <h1 className="sml">Admin Dashbord</h1>
          <hr />
          <div className="posts">
            <input
              className="inpb"
              placeholder="link..."
              value={lnk}
              onChange={(e) => setLnk(e.target.value)}
            />
            <br />
            <input
              className="inpb"
              placeholder="title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input
              className="inpb"
              placeholder="category{'res'}..."
              value={catg}
              onChange={(e) => setCatg(e.target.value)}
            />
            <br />
            <button className="inpb" onClick={addpost}>
              post
            </button>
          </div>
        </div>
      )}
      <hr />
      {isAuth &&
        dta.map((msg, index) => (
          <div className="admmsgdv" key={index}>
            <small>
              <i>mail: {msg.m1}</i>
              <button id="dlbtn" onClick={() => delpost(msg.id)}>
                &#128465;{" "}
              </button>
            </small>
            <br />
            message: {msg.m2}
            <br />
            <small>
              <small>
                <small>{msg.dttm}</small>
              </small>
            </small>
          </div>
        ))}
    </div>
  );
}
//--------------------------------------------------------------------------
function Page3() {
  // send message page

  //--------------------------------------------------------------------------------------------
  const [title, setTitle] = useState(""); // email id
  const [post, setPost] = useState(""); // message

  async function submittpost() {
    let dttm = new Date().toLocaleString();
    //
    try {
      if (!title.trim() || !post.trim()) {
        alert("enter email and message");
        return;
      } else {
        const postcollectiondb = collection(db, "posts"); // creating a collection in database and passing in the db(getFirestore) and collection name ("posts"/xxxx as we created in firebase database)
        function isValidEmail(email) {
          // email validation regex logic taken frm aichatbot, can use str.include("@/.") to create manual logic
          const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          return regex.test(email);
          /*
        The isValidEmail function uses a regular expression to check if an email address is valid. Let's break down the regular expression and explain its working parts:
    ^: The caret symbol ^ represents the start of the string.
    [\w-]+: This matches one or more word characters (letters, digits, and underscores) or hyphens. This part of the regex pattern matches the local-part of the email address (before the @ symbol).
    (.[\w-]+)*: This part of the regex pattern matches zero or more occurrences of any character (except for a newline character) followed by one or more word characters or hyphens. This part of the regex pattern matches the domain label before the top-level domain (the part before the last .).
    @: This character is matched literally. It represents the at symbol (@) in an email address.
    ([\w-]+.)+: This part of the regex pattern matches one or more occurrences of one or more word characters or hyphens followed by a dot (.). This part of the regex pattern matches the domain labels (everything between the @ symbol and the top-level domain).
    [a-zA-Z]{2,7}: This part of the regex pattern matches any lowercase or uppercase letter between two and seven times. This part of the regex pattern matches the top-level domain (.com, .org, etc.).
    $: The dollar sign $ represents the end of the string.
So, when the isValidEmail function is called with an email address as an argument, it uses the regex to test if the given email address matches the pattern. If it does, the function returns true, and if not, it returns false.
        */
        }

        if (!isValidEmail(title)) {
          alert("enter valid email: example@example.example");
          return;
        }
        await addDoc(postcollectiondb, {
          m1: title, // mail id
          m2: post, // message
          dttm: dttm,
          created: serverTimestamp(),
          category: "messages", // Category will be used to access db with "where" middlewere
        });
        //-------------------------------
        // clear the input
        setTitle("");
        setPost("");
        // console.log("post created");
        alert("Message Sent");
      }
    } catch (error) {
      alert("Error Sending Message ");
      console.log("error sending msg ");
    }
  }
  return (
    <div>
      <h1>
        📝 <u className="hvr">Contact me</u>
      </h1>
      <hr />
      <div id="crpst">
        <label className="crpslb">
          <b> E-Mail</b>
        </label>
        <input
          onChange={(e) => setTitle(e.target.value.trim())}
          value={title}
          id="ipar"
          placeholder="email..."
        />
        <br />
        <label className="crpslb">
          <b>Message</b>
        </label>
        <textarea
          onChange={(e) => setPost(e.target.value.trim())}
          value={post}
          id="txar"
          placeholder="message..."
        />
        <br />
        <button onClick={submittpost} id="pstbtn">
          Send Message
        </button>
      </div>
      <hr />
    </div>
  );
}

//--------------------------------------------------------------------------
function Error() {
  let navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, []);

  return (
    <div>
      <h1 className="ld">ERROR PAGE</h1>
      <p className="ld">redirecting home in 3sec...</p>
    </div>
  );
}

//------------------------------------------------------------------------------------------------
const Page4 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        🧐 <u className="hvr">About the project</u>
      </h1>
      <hr />
      <ul>
        <li>This is a Firebase and React portfolio</li>
        <li>
          Cloud Firestore is a NoSQL document database that lets you easily
          store, sync, and query data for your mobile and web apps - at global
          scale.
        </li>
        <li>
          React ⚛️ is the library for web and native user interfaces. Build user
          interfaces out of individual pieces called components written in
          JavaScript.
        </li>

        <li>
          Admin page('/admin')
          <button className="sml" onClick={() => navigate("/Admin")}>
            admin
          </button>
          can be accessed by admin who must login via admin mail id after which,
          token stored in the memory so that it persist the authentication state
          after log in, the admin dashbord opens which will display all the
          messages with date/time which were sent via contact page form and
          admin can chose to delete any message or post/delete resources if they
          wish, delete button and message board only appears after admin login
          along with log out and admin link in navbar.
        </li>
        <li>
          Navbar is dynamic means it will change for mobile devices or smaller
          screens.
        </li>
        <li>
          Anyone can send message via message form page, the data will be
          updated in db and visible in admin dashbord, wont submit on empty
          fields or wrong email format.
        </li>
        <li>
          All the clickable links and buttons in navbar, delete post [🗑️], log
          in/log out, pagination(prev/next) and create post buttons will change
          color when hovered over
        </li>
        <li>
          Entering wrong url will open error page then redirect to home after 3
          seconds
        </li>
        <li>
          All the code for this project available at <br />
          <a id="ghlink" href="https://github.com/tfml1" target="_blank">
            <button className="sml">github</button>
          </a>
          <br />
          <i>(click to open in new window)</i>
          <br />
          If you find this project useful, consider giving it a star ⭐️
        </li>
      </ul>
      <hr />
      <br />
      <span className="sml">⚛⚛⚛⚛⚛</span>
      <br />
      <br />
      <hr />
    </div>
  );
};
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
function Page5({ isAuth }) {
  const [dta, setDta] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  // const memoizedData = useMemo(() => dta, [dta]);
  //--------------------------------------------
  useEffect(() => {
    var unsubscribecleanupsnpsht; // declearing it here so lexical scoping issue does not occor
    // this useEffect will immidiatly run once admin logins and set the state setDta with data
    async function getPosts() {
      const postcollectiondbmsg = collection(db, "posts");
      const resquery = query(
        postcollectiondbmsg,
        where("category", "==", "res"),
        orderBy("created", "asc")
        /* will give error first time, need to manually create query frm given link in console
        @firebase/firestore: Firestore (10.8.1): Uncaught Error in snapshot listener: FirebaseError: [code=failed-precondition]: The query requires an index. You can create it here: https://console.firebase.google.com/v1/r/project/basechat-5fbeb/firestore/indexes?create_composite=Ck9wcm9qZWN0cy9iYXNlY2hhdC01ZmJlYi9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvbWVzc2FnZXMvaW5kZXhlcy9fEAEaCAoEcm9vbRABGgsKB2NyZWF0ZWQQARoMCghfX25hbWVfXxAB
        it will take 1 min to build, now working */
      );

      // // Fetch data from local storage if available
      // const localData = localStorage.getItem("dta");
      // if (localData) {
      //   setDta(JSON.parse(localData));
      //   return;
      // }
      // subscribe to snapshot listener
      unsubscribecleanupsnpsht = onSnapshot(resquery, (snapsht) => {
        // console.log("new message", snapsht); // snpsht is big obj with many data, we now extract only what we need
        setDta(snapsht.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // now only room1 messages visible
      });
      //  -------------------------------------------------------------------
      //----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    }

    // // Store the data in local storage
    // localStorage.setItem("dta", JSON.stringify(dta));

    getPosts();
    return () => {
      unsubscribecleanupsnpsht(); // cleanup
    };
  }, []);
  //--------------------------------------------------------------------------------------

  // //--------------------------------------------------------
  async function delpost(id) {
    // delete using deleteDoc, "doc" specifies which doc u wanna delete
    // doc takes 3 args- db, collection name and doc id u want to delete
    const doctodel = doc(db, "posts", id); // we recieve id frm dta obj, each post has a post id as a key in dta.map((post) that we can pass via button onClick={()=>delpost(post.id)}
    await deleteDoc(doctodel);
    alert("post deleted");
    //---------------------------------------------------------------------------------------------------------
  }
  //----------------------------------------------------------------------------------------------
  //   // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dta.slice(indexOfFirstPost, indexOfLastPost);
  // const currentPosts = useMemo(() => {
  //   return memoizedData.slice(indexOfFirstPost, indexOfLastPost);
  // }, [memoizedData, indexOfFirstPost, indexOfLastPost]);

  // console.log(currentPosts);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //-----------------------------------------------------
  return (
    <div>
      <h1>
        📚 <u className="hvr">Resources</u>
      </h1>
      <hr />
      <a id="ghlink" href="https://hyt38y.csb.app/" target="_blank">
        <button className="sml">MyNotes</button>
      </a>
      <hr />
      <h3>Total Posts: {dta.length}</h3>
      <hr />
      <h4>
        PostPerPage :{" "}
        <input
          id="pppip"
          value={postsPerPage}
          onChange={(e) => setPostPerPage(e.target.value)}
        />
      </h4>
      <hr />
      {/* ------pagination-------------------------------------------------------------------- */}
      <button
        id="pgnt"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page: {currentPage} of {Math.ceil(dta.length / postsPerPage)}
      </span>
      <button
        id="pgnt"
        onClick={() => paginate(currentPage + 1)}
        disabled={indexOfLastPost >= dta.length}
      >
        Next
      </button>
      <hr />
      <div className="video-grid">
        <div className="container">
          {/* {dta.map((post) => ( // this will display all the posts without pagination logic instead we use currentpost slice that will display 10 posts per page */}
          {currentPosts.map((post, index) => (
            <div className="video-wrapper">
              <ReactPlayer
                className="react-player"
                key={index}
                url={post.m1}
                width="95%"
                height="95%"
                controls={true}
              />
              <span className="ttl">{post.m2}</span>
              {isAuth && (
                <button
                  className="button-wrapper"
                  onClick={() => delpost(post.id)}
                >
                  del
                </button>
              )}
            </div>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

function Projects() {
  //
  return (
    <div>
      <h1>
        👨🏻‍💻 <u className="hvr">Projects</u>
      </h1>
      <div className="prj">
        <hr />
        ⚛ blogPost - with firebase auth and db <br />
        <a id="ghlink" href="https://v2mt5r.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ baseChat - with firebase auth and db + live chat <br />
        <a id="ghlink" href="https://t6dwtw.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ rtkCrud <br />
        <a id="ghlink" href="https://98zkc8.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ socketChat - websocket/socket.io and react <br />
        <a id="ghlink" href="https://dxg9cc-5173.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ typeScriptCrud <br />
        <a id="ghlink" href="  https://v2c3pj.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ codeWithMemes - basic brand page css demo <br />
        <a id="ghlink" href=" https://q59s9w.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ paginationDemo - with jsonplaceholder dummy api <br />
        <a id="ghlink" href="https://krp766.csb.app" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ apiFun - API/AJAX, reactQuery, RHF/yup <br />
        <a id="ghlink" href="  https://v5tlmr.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ nativeCrud <br />
        <a id="ghlink" href="  https://rhmlxn.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ nativeWeather - openweathermapAPI with AsyncStorage
        <br />
        <a id="ghlink" href="https://3q33yc.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ nativeCV-Maker - expo-print & expo-sharing
        <br />
        <a id="ghlink" href="https://r5dy4m-8080.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ MyNotes - with Prism.js code highlighter
        <br />
        <a id="ghlink" href="https://hyt38y.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ codeEditor - with Monaco
        <br />
        <a id="ghlink" href="https://cvn4y7.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ MyTemplate - basic boiler code with navigation
        <br />
        <a id="ghlink" href="https://67vl6t.csb.app/" target="_blank">
          <button className="sml">open in new tab</button>
        </a>
        <hr />
        ⚛ portfolio - with firebase auth and db <br />
        <hr />
      </div>
      <hr />
      <i>(All the code available at github)</i>
      <br />

      <a id="ghlink" href="https://github.com/tfml1" target="_blank">
        <button className="sml">github</button>
      </a>
      <br />

      <i>(click the button to open in new window)</i>
      <hr />
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//-------------//
//  give a ⭐️  //
//-------------//
