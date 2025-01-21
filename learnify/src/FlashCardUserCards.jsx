function FlashCardUserCards({user, numCards}) {
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