import '../styles/MainContent.css'; 
import bg1 from '../assets/bg1.png';
import vec from '../assets/Vector.png';


const MainContent = () => {
    return (
        <div className="main-content-intro">
            <img src={bg1} alt="Descriptive Visual" />
            <h1 className='main-content-title'>Pocket Notes</h1>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
            <div className="encrypted">
                <img src={vec} alt="Encrypted"/>
                <p>end-to-end encrypted</p>
            </div>
        </div>
    );
};

export default MainContent;