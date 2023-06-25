import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useNavigate } from "react-router-dom";
import { BackButton } from '../buttons/BackButton';

import IconCharity from './../..//assets/icons/icon_charity_001_FFFFFF_32x32.svg';
import IconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import IconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import IconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';

const UserPreference = () => {
    const [mainCategory, setMainCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      // Fetch user preferences when the component mounts
      fetchUserPreferences();
    }, []);
  
    useEffect(() => {
      // Save user preferences to local storage when subCategories change
      localStorage.setItem('subCategories', JSON.stringify(subCategories));
    }, [subCategories]);

    useEffect(() => {
        // Check if the user is logged in or logged out
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            // User logged in, fetch preferences from local storage
            fetchUserPreferences();
          } else {
            // User logged out, clear preferences from local storage
            localStorage.removeItem('subCategories');
            setSubCategories([]);
          }
        });
    
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      }, []);
  
    const fetchUserPreferences = async () => {
      try {
        if (!auth.currentUser) {
          return;
        }
        const userId = auth.currentUser.uid;
        const userPreferencesRef = doc(db, 'user-pref', userId);
        const userPreferencesDoc = await getDoc(userPreferencesRef);
  
        if (userPreferencesDoc.exists()) {
          const preferencesData = userPreferencesDoc.data();
          setMainCategory(preferencesData.mainCategory);
          setSubCategories(preferencesData.subCategories);
        } else {
          console.log('User preferences not found.');
          setSubCategories([]); // Set initial subcategories to empty array
        }
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      }
    };
  
    const saveUserPreferences = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userPreferencesRef = doc(db, 'user-pref', userId);
  
        const preferencesData = {
          mainCategory: mainCategory,
          subCategories: subCategories,
        };
  
        await setDoc(userPreferencesRef, preferencesData);
        console.log('User preferences saved successfully.');
      } catch (error) {
        console.error('Error saving user preferences:', error);
      }
    };
  
    const handleMainCategoryChange = (event) => {
      setMainCategory(event.target.value);
    };
  
    const handleSubcategoryToggle = (subcategory) => {
      if (subCategories.includes(subcategory)) {
        setSubCategories(subCategories.filter((sc) => sc !== subcategory));
      } else {
        setSubCategories([...subCategories, subcategory]);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      saveUserPreferences();
      navigate("/home");
    };
  
    return (
    <div className="flex min-h-full w-full flex-1 flex-col justify-center items-center  lg:px-8 sm:w-full sm:h-full ">
        <BackButton></BackButton>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm w-full bg-primary pt-8 pb-14 border border-gray-200">

<BackButton/>
  {/* <img
      className="mx-auto h-6 w-auto"
      src={logo}
      alt="Logo"
  /> */}
  <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-white">Mijn interesses</h1>
  <h2 className="mt-2 text-center px-14 text-xs tracking-tight text-white">
  Geef ons inzicht in uw interesses door de bijbehorende subcategorieën aan te vinken. Op deze manier kunnen we berichten tonen die aansluiten bij uw voorkeuren. <br></br> 
  </h2>
</div>

      <form onSubmit={handleSubmit}>
    

        {/* Subcategory selection */}
        <div className="pt-10 px-10 text-xs">
            
            
            <div className="subcategory-container">

                <div className="subcategory-group">

                <div className="flex items-center">


                            <div className="mr-2 rounded p-2 bg-primary">
                                <img className="w-3" src={ IconFinancial } alt="Financieel"></img>
                            </div>
                            <div>
                             
                                <h3 className="text-dark text-sm font-semibold">Financieel</h3>
                             
                            </div>
                </div>

                    <div className='subcategory-grid flex flex-wrap mt-3 mb-5 text-xs'>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Onderwijs') && 'bg-primary text-white '
                    }`}
                    onClick={() => handleSubcategoryToggle('Onderwijs')}
                    >
                    Onderwijs
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Milieu') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Milieu')}
                    >
                    Milieu
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Dierenwelzijn") && "bg-primary text-white"
                    }`}
                    onClick={() => handleSubcategoryToggle("Dierenwelzijn")}
                    >
                    Dierenwelzijn
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Medisch Hulp") && "bg-primary text-white"
                    }`}
                    onClick={() => handleSubcategoryToggle("Medisch Hulp")}
                    >
                    Medisch Hulp
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Ondersteuning') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Ondersteuning')}
                    >
                    Ondersteuning
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Moeilijke situaties') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Moeilijke situaties')}
                    >
                    Moeilijke situaties
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Zware dagen') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Zware dagen')}
                    >
                    Zware dagen
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Huisvesting") && "bg-primary text-white"
                    }`}
                    onClick={() => handleSubcategoryToggle("Huisvesting")}
                    >
                    Huisvesting
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Ouderen") && "bg-primary text-white"
                    }`}
                    onClick={() => handleSubcategoryToggle("Ouderen")}
                    >
                    Ouderen
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Jongeren") && "bg-primary text-white"
                    }`}
                    onClick={() => handleSubcategoryToggle("Jongeren")}
                    >
                    Jongeren
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Kinderen") && "bg-primary text-white"
                    }`}
                    onClick={() => handleSubcategoryToggle("Kinderen")}
                    >
                    Kinderen
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Studenten") && "bg-primary text-white"
                    }`}
                    onClick={() => handleSubcategoryToggle("Studenten")}
                    >
                    Studenten
                    </div>

                    </div>
                   
                </div>

                <div className="subcategory-grid">
                
                <div className="flex items-center mt-10">


                            <div className="mr-2 rounded p-2 bg-primary">
                                <img className="w-3" src={ IconStuff} alt="Stuff"></img>
                            </div>
                            <div>
                                
                                <h3 className="text-dark text-sm font-semibold">Spullen</h3>
                             
                            </div>
                </div>

                    <div className='subcategory-grid flex flex-wrap mt-3 mb-5 text-xs'>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Kleding') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Kleding')}
                    >
                    Kleding
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Elektronica') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Elektronica')}
                    >
                    Elektronica
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Boeken & Media') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Boeken & Media')}
                    >
                    Boeken & Media
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Meubels & Huishoudelijke artikelen') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Meubels & Huishoudelijke artikelen')}
                    >
                    Meubels & Huishoudelijke artikelen
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Kunst & Ambachten') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Kunst & Ambachten')}
                    >
                    Kunst & Ambachten
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Speelgoed & Spellen') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Speelgoed & Spellen')}
                    >
                    Speelgoed & Spellen
                    </div>

                    </div>
                   
                </div>
                
                <div className="subcategory-group">
                
                <div className="flex items-center mt-10">


                        <div className="mr-2 rounded p-2 bg-primary">
                            <img className="w-3" src={ IconConsumption } alt="Eten"></img>
                        </div>
                        <div>
                        
                            <h3 className="text-dark text-sm font-semibold">Eten</h3>
                        
                        </div>
                        </div>

                    <div className='subcategory-grid flex flex-wrap mt-3 mb-5 text-xs'>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Voedselreclycing') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Voedselreclycing')}
                    >
                    Voedselreclycing
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Voedselbanken') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Voedselbanken')}
                    >
                    Voedselbanken
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Voedselpakketten') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Voedselpakketten')}
                    >
                    Voedselpakketten
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Ongeopende etenswaren') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Ongeopende etenswaren')}
                    >
                    Ongeopende etenswaren
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Boodschappen') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Boodschappen')}
                    >
                    Boodschappen
                    </div>

                    </div>
                    
                </div>

                <div className="subcategory-group">
                    
                <div className="flex items-center mt-10">


                    <div className="mr-2 rounded p-2 bg-primary">
                        <img className="w-3" src={ IconCharity } alt="Acties"></img>
                    </div>
                    <div>
                    
                        <h3 className="text-dark text-sm font-semibold">Acties</h3>
                    
                    </div>
                </div>

                    <div className='subcategory-grid flex flex-wrap mt-3 mb-5 text-xs'>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Buurthuis-activiteiten') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Buurthuis-activiteiten')}
                    >
                    Buurthuis-activiteiten
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                        subCategories.includes('Vrijwilligerswerk') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Vrijwilligerswerk')}
                    >
                    Vrijwilligerswerk
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                        subCategories.includes('Buurtmarkten') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Buurtmarkten')}
                    >
                    Buurtmarkten
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes('Buurt-collectieven') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Buurt-collectieven')}
                    >
                    Buurt-collectieven
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                        subCategories.includes('Milieu') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Milieu')}
                    >
                    Milieu
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                        subCategories.includes('Evenementen') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Evenementen')}
                    >
                    Evenementen
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                        subCategories.includes('Sport') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Sport')}
                    >
                    Sport
                    </div>

                    <div
                    className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                        subCategories.includes('Wijkhuis') && 'bg-primary text-white'
                    }`}
                    onClick={() => handleSubcategoryToggle('Wijkhuis')}
                    >
                    Wijkhuis
                    </div>

                    </div>
                   
                </div>

            </div>
        </div>

        <br />
        
        <button type="submit" 
        className="block items-center text-xs font-medium mb-10 justify-center rounded-full py-3 px-10 bg-gray-600 text-white mx-auto" 
        >Opslaan</button>
      </form>

      <div className="text-center text-xxs px-16 pb-10">
          <p>Lees <a href="/more-info" className=" underline underline-offset-1">het privacyartikel</a> voor meer informatie over hoe Charium je interesses gebruikt.</p>
        </div>
    
    </div>
  );
  };
  
  export default UserPreference;