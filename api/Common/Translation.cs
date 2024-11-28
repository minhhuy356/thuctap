using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Translation.V2;

namespace api.Common
{
    public class Translation
    {
        private readonly TranslationClient _client;

        public Translation()
        {
            _client = TranslationClient.Create();
        }

        public async Task<string> TranslateTextAsync(string text, string targetLanguage = "en")
        {
            var response = await _client.TranslateTextAsync(text, targetLanguage);
            return response.TranslatedText;
        }
    }
}