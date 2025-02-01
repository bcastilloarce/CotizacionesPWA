import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!
});

const QUOTE_NUMBER_KEY = 'quote_number_sequence';

export async function getNextQuoteNumber(): Promise<number> {
    try {
        // Increment and get the new value atomically
        const nextNumber = await redis.incr(QUOTE_NUMBER_KEY);

        // Format the number to ensure 3 digits with leading zeros
        if (nextNumber > 999) {
            // Reset the sequence if it exceeds 999
            await redis.set(QUOTE_NUMBER_KEY, 1);
            return 1;
        }

        return nextNumber;
    } catch (error) {
        console.error('Error getting next quote number:', error);
        throw new Error('Failed to generate quote number');
    }
}
