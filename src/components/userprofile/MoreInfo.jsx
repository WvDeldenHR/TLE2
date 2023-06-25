import { useState } from 'react';
import { BackButton } from '../buttons/BackButton';

const MoreInfo = () => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [interestsOpen, setInterestsOpen] = useState(false);

  const toggleLocation = () => {
    setLocationOpen(!locationOpen);
  };

  const toggleInterests = () => {
    setInterestsOpen(!interestsOpen);
  };

  return (
    <div className="flex min-h-full w-full flex-1 flex-col justify-center items-center  lg:px-8 sm:w-full sm:h-full">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm w-full pt-8 pb-10 ">

      <BackButton/>
        {/* <img
            className="mx-auto h-6 w-auto"
            src={logo}
            alt="Logo"
        /> */}
        <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-black">Meer Info</h1>
        <h2 className="mt-2 text-center text-xs tracking-tight text-black px-16">
        Ontdek de privacyartikelen die jouw gegevens beschermen en hoe wij jouw privacy waarborgen..<br></br> 
        </h2>

    </div>
      <div
        className="flex items-center cursor-pointer bg-gray-100 w-full shadow-sm text-sm"
        onClick={toggleLocation}
      >
        <h1 className="mr-2 ms-10 p-3">Meer informatie over de locatie algoritme</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transform ${locationOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {locationOpen && (
        <div className="mt-2 ml-4 p-5 text-xs">
          <p><h4 className='font-bold'>Hoe Charium jouw privacy respecteert en relevante berichten in de buurt toont</h4> <br></br>

Bij Charium begrijpen we dat privacy belangrijk voor je is. Daarom willen we je laten weten hoe we jouw privacy respecteren en tegelijkertijd relevante berichten in jouw buurt kunnen tonen. We hebben verschillende maatregelen genomen om ervoor te zorgen dat jouw persoonlijke gegevens veilig zijn en dat je volledige controle hebt over wat er met die gegevens gebeurt. <br></br> <br></br>

<h4 className='font-bold'>Postcode in plaats van exacte locatie</h4> <br></br>

Om relevante berichten in jouw buurt te kunnen tonen, vragen we niet om je exacte locatie. In plaats daarvan vragen we om je postcode. Dit helpt ons om alleen informatie te tonen die relevant is voor jouw specifieke gebied. Door alleen je postcode te delen, blijft je exacte locatie privé en wordt jouw anonimiteit behouden. We slaan jouw exacte locatie niet op en hebben geen toegang tot je persoonlijke adresgegevens. <br></br> <br></br>

<h4 className='font-bold'>Data bescherming en vertrouwelijkheid</h4> <br></br>

We willen benadrukken dat we jouw privacy serieus nemen. De postcode die je deelt, wordt niet gedeeld of getoond aan anderen. We hebben strikte beveiligingsmaatregelen getroffen om ervoor te zorgen dat jouw gegevens veilig blijven. Jouw postcode wordt uitsluitend gebruikt om relevante berichten te filteren en weer te geven die betrekking hebben op jouw buurt. Het wordt op geen enkele andere manier gebruikt of gedeeld met derden. <br></br> <br></br>

<h4 className='font-bold'>Alleen voor jouw eigen gebruik</h4> <br></br>

De locatiegegevens die je verstrekt, worden alleen gebruikt om berichten te tonen die voor jou relevant zijn. Deze berichten kunnen bijvoorbeeld gaan over evenementen, nieuws, aanbiedingen of andere informatie die nuttig is binnen jouw buurt. We tonen deze berichten alleen aan jou in de app en er wordt geen persoonlijk identificeerbare informatie gedeeld met derden.</p>
       <br></br> <br></br>
        </div>
      )}

      <div
        className="flex items-center cursor-pointer bg-gray-100 w-full shadow-sm text-sm mb-10"
        onClick={toggleInterests}
      >
        <h1 className="mr-2 ms-10 p-3">Meer informatie over de interesses</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transform ${interestsOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {interestsOpen && (
        <div className="mt-2 ml-4 p-5 text-xs">
          <p>

<h4 className='font-bold'>Hoe Charium jouw privacy respecteert en relevante berichten toont op basis van jouw interesses</h4> <br></br>

Bij Charium begrijpen we dat je een gepersonaliseerde gebruikerservaring wilt, waarbij je snel toegang hebt tot berichten die jou interesseren. We hebben functionaliteit ingebouwd waarmee je jouw interesses kunt selecteren uit verschillende subcategorieën. Deze interesses worden gebruikt om relevante berichten te tonen die aansluiten bij jouw voorkeuren en interesses. We willen echter benadrukken dat we jouw privacy respecteren en dat deze gegevens op een veilige en vertrouwelijke manier worden behandeld. <br></br> <br></br>

<h4 className='font-bold'>Relevante berichten op maat</h4> <br></br>

Door jouw interesses te kennen, kunnen we berichten op maat tonen die waarschijnlijk relevant voor jou zijn. Dit betekent dat je minder tijd hoeft te besteden aan het zoeken naar berichten die jou interesseren, en dat je een betere gebruikerservaring hebt in de app. Deze berichten kunnen bijvoorbeeld gaan over nieuws, evenementen, aanbiedingen of andere informatie die aansluit bij jouw geselecteerde interesses. <br></br> <br></br>

<h4 className='font-bold'>Gegevensbescherming en vertrouwelijkheid</h4> <br></br>

Bij Charium nemen we jouw privacy serieus. De interesses die je selecteert, worden strikt vertrouwelijk behandeld en met niemand anders gedeeld. Jouw gegevens worden uitsluitend gebruikt om relevante berichten te tonen binnen de app. We verkopen, verhuren of delen jouw interesses niet met adverteerders, derden of andere gebruikers. Jouw privacy en de bescherming van jouw persoonlijke gegevens zijn van het grootste belang voor ons. <br></br> <br></br>

<h4 className='font-bold'>Alleen zichtbaar voor jou en aanpasbaar</h4> <br></br>

De interesses die je selecteert, zijn alleen zichtbaar voor jou. Niemand anders kan jouw geselecteerde interesses zien. Je hebt volledige controle over jouw interesses en kunt deze op elk gewenst moment aanpassen in de app. Als je jouw interesses wilt bijwerken, verwijderen of wijzigen, kun je dit eenvoudig doen via de instellingen. We willen dat je de vrijheid hebt om jouw interesses op jouw eigen voorwaarden te beheren. <br></br> <br></br>

<h4 className='font-bold'>Jouw privacy staat voorop</h4> <br></br>

Bij Charium staat de bescherming van jouw privacy centraal. We begrijpen het belang van transparantie en controle als het gaat om het delen van persoonlijke gegevens. We zullen er altijd naar streven om jouw privacy te waarborgen en ervoor te zorgen dat je je comfortabel voelt bij het gebruik van onze app. Jouw vertrouwen is van onschatbare waarde en we zullen er alles aan doen om dit te behouden</p> <br></br> <br></br>
        </div>
      )}
    </div>
  );
};

export default MoreInfo;
