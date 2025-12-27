using Microsoft.AspNetCore.Mvc;
using LearnifyAPI.Models;
using LearnifyAPI.Dtos;

namespace LearnifyAPI.Controllers
{
    [ApiController]
    [Route("api/flashcard-sets")]
    public class FlashcardSetsController : ControllerBase
    {
        // Temporary in-memory storage for Flashcard Sets
        private static readonly List<FlashcardSet> FlashcardSets = new()
        {
            new FlashcardSet
            {
                Id = 1,
                Title = "Data Structures",
                Description = "Stacks, queues, trees"
            },
            new FlashcardSet
            {
                Id = 2,
                Title = "Computer Architecture",
                Description = "ISA, abstraction"
            }
        };


        // HTTP GET request to fetch all flashcard sets (currently hardcoded data)
        [HttpGet]
        public IActionResult GetFlashcardSets()
        {
            return Ok(FlashcardSets);
        }


        // HTTP GET/{id} via flashcard set Id (currently hardcoded data)
        [HttpGet("{id}")]
        public IActionResult GetFlashcardSetByID([FromRoute] int id)
        {
            var flashcardSet = FlashcardSets.FirstOrDefault(fs => fs.Id == id);

            if (flashcardSet == null)
            {
                return NotFound();
            }

            return Ok(flashcardSet);
        }


        // HTTP POST; data must fit in the FlashcardSetCreateDto
        [HttpPost]
        public IActionResult CreateFlashcardSet([FromBody] FlashcardSetCreateDto dto)
        {
            var newFlashcardSet = new FlashcardSet
            {
                Id = 3,
                Title = dto.Title,
                Description = dto.Description
            };

            FlashcardSets.Add(newFlashcardSet);

            return CreatedAtAction(
                nameof(GetFlashcardSetByID),
                new { id = newFlashcardSet.Id },
                newFlashcardSet
            );
        }


        // HTTP PUT; data must fit into FlashcardSetEditDto
        [HttpPut("{id}")]
        public IActionResult EditFlashcardSet([FromRoute] int id, [FromBody] FlashcardSetEditDto dto)
        {

            var foundFlashcardSet = FlashcardSets.FirstOrDefault(set => set.Id == id);

            if (foundFlashcardSet == null)
            {
                return NotFound();
            }

            foundFlashcardSet.Title = dto.Title;
            foundFlashcardSet.Description = dto.Description;

            return Ok(foundFlashcardSet);
        }


        // HTTP DELETE; Verify if data is present, if not -> return null, if so -> delete and return 204 (NotFound())
        [HttpDelete("{id}")]
        public IActionResult DeleteFlashcardSet([FromRoute] int id)
        {
            var flashcardSetToDelete = FlashcardSets.FirstOrDefault(set => set.Id == id);

            if (flashcardSetToDelete == null)
            {
                return NotFound();
            }

            FlashcardSets.Remove(flashcardSetToDelete);

            return NoContent();
        }
    }
}