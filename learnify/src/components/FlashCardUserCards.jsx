import "./FlashCardUserCards.css"

function FlashCardUserCards({set_id, user, numCards}) {
    set_id = set_id.id
    return (
        <div className="flashContent">
            <div id="flashUser">
                {user}
            </div>
            <div className="numCards">
                <img id="flashCardImg" src="/images/flashcard1.png" alt="Image of Flashcard" />
                <p>{numCards}</p> 
            </div>
        </div>
    );
}

export default FlashCardUserCards;