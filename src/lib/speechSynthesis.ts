/**
 * Browser SpeechSynthesis / Web Speech API utility
 * for vocalizing infrastructure intelligence & accessibility impacts.
 */

let activeUtterance: SpeechSynthesisUtterance | null = null;

export function speakText(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: unknown) => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Browser Web Speech API not supported on this client.');
    return false;
  }

  // Cancel any ongoing speech
  stopSpeaking();

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    utterance.onstart = () => {
      activeUtterance = utterance;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      activeUtterance = null;
      if (onError) onError(e);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    if (onError) onError(err);
    return false;
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  activeUtterance = null;
}

export function isSpeaking(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  return window.speechSynthesis.speaking;
}
