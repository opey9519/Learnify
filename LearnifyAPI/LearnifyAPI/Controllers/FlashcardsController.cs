using LearnifyAPI.Models;
using LearnifyAPI.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace LearnifyAPI.Controllers
{
    [ApiController]
    [Route("api/flashcard-sets/{setId}/flashcards")]
    public class FlashcardsController : ControllerBase
    {
        // Temporary in-memory storage for Flashcards
        private static readonly List<Flashcard> Flashcards = new()
        {
            new Flashcard
            {
                Id = 1,
                FlashcardSetId = 1,
                Question = "What is a stack?",
                Answer = "A LIFO data structure"
            },
            new Flashcard
            {
                Id = 2,
                FlashcardSetId = 1,
                Question = "What is a queue?",
                Answer = "A FIFO data structure"
            }
        };

        // HTTP GET request to fetch all flashcards matching their flashcard set (currently hardcoded data)
        [HttpGet]
        public IActionResult GetFlashcards(int setId)
        {
            var flashcards = Flashcards.Where(card => card.FlashcardSetId == setId).ToList();

            return Ok(flashcards);
        }

        // HTTP GET/{id} via flashcard set Id (currently hardcoded data)
        [HttpGet("{id}")]
        public IActionResult GetFlashcardById([FromRoute] int id, int setId)
        {
            var flashcard = Flashcards.FirstOrDefault(card => card.Id == id && card.FlashcardSetId == setId);

            if (flashcard == null)
            {
                return NotFound();
            }

            return Ok(flashcard);
        }

        // HTTP POST; data must fit in the FlashcardCreateDto
        [HttpPost]
        public IActionResult CreateFlashcard(FlashcardCreateDto dto)
        {
            var newFlashcard = new Flashcard
            {
                Id = dto.Id,
                FlashcardSetId = dto.FlashcardSetId,
                Question = dto.Question,
                Answer = dto.Answer
            };

            Flashcards.Add(newFlashcard);

            return CreatedAtAction(
                nameof(GetFlashcardById),
                new { setId = newFlashcard.FlashcardSetId, id = newFlashcard.Id },
                newFlashcard
            );
        }

        [HttpPut("{id}")]
        public IActionResult EditFlashcard(int setId, [FromRoute] int id, FlashcardEditDto dto)
        {
            var foundFlashcard = Flashcards.FirstOrDefault(card => card.Id == id && card.FlashcardSetId == setId);

            if (foundFlashcard == null)
            {
                return NotFound();
            }

            foundFlashcard.Question = dto.Question;
            foundFlashcard.Answer = dto.Answer;

            return Ok(foundFlashcard);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFlashcard(int setId, [FromRoute] int id)
        {
            var flashcardToDelete = Flashcards.FirstOrDefault(card => card.Id == id && card.FlashcardSetId == setId);

            if (flashcardToDelete == null)
            {
                return NotFound();
            }

            Flashcards.Remove(flashcardToDelete);

            return NoContent();
        }

        // Create Generate Flashcards via AI controller 
    }
}