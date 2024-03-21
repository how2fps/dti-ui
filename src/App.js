import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "./App.css";
import PixelGrid from "./components/PixelGrid";
function App() {
       const firebaseConfig = {
              apiKey: "AIzaSyCdDsg6x19bzJAokeCqtfdBYpv4aoQUH64",
              authDomain: "dti-ui.firebaseapp.com",
              projectId: "dti-ui",
              storageBucket: "dti-ui.appspot.com",
              messagingSenderId: "283041040161",
              appId: "1:283041040161:web:de955f8da2c49742492060",
              measurementId: "G-BTYJBZYSYT",
       };

       // Initialize Firebase
       const app = initializeApp(firebaseConfig);
       const db = getFirestore(app);

       return (
              <div className="App">
                     <PixelGrid db={db} />
              </div>
       );
}

export default App;
