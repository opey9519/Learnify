namespace LearnifyAPI.Dtos
{
    public class FlashcardCreateDto
    {
        public int Id { get; set; }
        public int FlashcardSetId { get; set; }

        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
    }
}