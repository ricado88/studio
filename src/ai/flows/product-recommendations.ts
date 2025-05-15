// src/ai/flows/product-recommendations.ts
'use server';

/**
 * @fileOverview AI-powered product recommendation flow.
 *
 * This file defines a Genkit flow that provides personalized product recommendations based on user history.
 * It exports:
 *   - `getProductRecommendations`: A function to trigger the product recommendation flow.
 *   - `ProductRecommendationsInput`: The input type for the `getProductRecommendations` function.
 *   - `ProductRecommendationsOutput`: The output type for the `getProductRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  viewingHistory: z.array(
    z.string().describe('IDs of products the user has viewed')
  ).optional().describe('The user viewing history.'),
  cartItems: z.array(
    z.string().describe('IDs of products currently in the user cart')
  ).optional().describe('The IDs of products currently in the user cart.'),
  searchTerm: z.string().optional().describe('The user search term.'),
  numberOfRecommendations: z.number().default(5).describe('The number of product recommendations to return.')
});

export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  productRecommendations: z.array(
    z.object({
      productId: z.string().describe('The ID of the recommended product.'),
      reason: z.string().describe('The reason why the product is recommended.')
    })
  ).describe('A list of product recommendations with reasons.')
});

export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const productRecommendationsPrompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: { schema: ProductRecommendationsInputSchema },
  output: { schema: ProductRecommendationsOutputSchema },
  prompt: `You are an expert product recommendation engine.

  Based on the user's viewing history, items in their cart, and search term, recommend products that the user might be interested in.
  Explain the reason for each recommendation.

  Viewing History: {{#if viewingHistory}}{{{viewingHistory}}}{{else}}None{{/if}}
  Cart Items: {{#if cartItems}}{{{cartItems}}}{{else}}None{{/if}}
  Search Term: {{#if searchTerm}}{{{searchTerm}}}{{else}}None{{/if}}

  Provide {{numberOfRecommendations}} recommendations.
  Format your response as a JSON array of product IDs and reasons.  Ensure that the output can be parsed by Javascript's JSON.parse.
  `
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const { output } = await productRecommendationsPrompt(input);
    return output!;
  }
);
