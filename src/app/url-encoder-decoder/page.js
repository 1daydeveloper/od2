'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw, Clipboard, X } from "lucide-react";

export default function URLEncoderDecoder() {
    const [inputText, setInputText] = useState('');
    const [encodedText, setEncodedText] = useState('');
    const [decodedText, setDecodedText] = useState('');
    const [copiedEncoded, setCopiedEncoded] = useState(false);
    const [copiedDecoded, setCopiedDecoded] = useState(false);
    const [copiedInput, setCopiedInput] = useState(false);

    // Example URL for demonstration
    const exampleURL = 'https://example.com/search?q=hello world&category=web development';

    // Handle input change - automatically encode and decode
    const handleInputChange = (text) => {
        setInputText(text);

        if (!text) {
            setEncodedText('');
            setDecodedText('');
            return;
        }

        // Always try to encode
        try {
            setEncodedText(encodeURIComponent(text));
        } catch (error) {
            setEncodedText('Error: Unable to encode');
        }

        // Always try to decode
        try {
            setDecodedText(decodeURIComponent(text));
        } catch (error) {
            setDecodedText('Error: Invalid encoded URL');
        }
    };

    // Copy encoded text to clipboard
    const handleCopyEncoded = async () => {
        try {
            await navigator.clipboard.writeText(encodedText);
            setCopiedEncoded(true);
            setTimeout(() => setCopiedEncoded(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Copy decoded text to clipboard
    const handleCopyDecoded = async () => {
        try {
            await navigator.clipboard.writeText(decodedText);
            setCopiedDecoded(true);
            setTimeout(() => setCopiedDecoded(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Copy input to clipboard
    const handleCopyInput = async () => {
        try {
            await navigator.clipboard.writeText(inputText);
            setCopiedInput(true);
            setTimeout(() => setCopiedInput(false), 2000);
        } catch (err) {
            console.error('Failed to copy input:', err);
        }
    };

    // Paste from clipboard to input
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            handleInputChange(text);
        } catch (err) {
            console.error('Failed to paste:', err);
        }
    };

    // Clear all fields
    const handleClear = () => {
        setInputText('');
        setEncodedText('');
        setDecodedText('');
        setCopiedEncoded(false);
        setCopiedDecoded(false);
        setCopiedInput(false);
    };

    // Load example
    const loadExample = () => {
        handleInputChange(exampleURL);
    };

    // Use encoded result as new input
    const useEncoded = () => {
        handleInputChange(encodedText);
    };

    // Use decoded result as new input
    const useDecoded = () => {
        handleInputChange(decodedText);
    };

    return (
        <div className="maincard p-4 sm:p-6 lg:p-8">
            <Card className="max-w-5xl mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl sm:text-3xl lg:text-4xl mb-3">
                        URL Encoder/Decoder
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                        Instantly see both encoded and decoded versions of any URL. Perfect for developers, marketers, and anyone working with web URLs.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button
                            onClick={loadExample}
                            variant="secondary"
                            className="w-full sm:w-auto"
                        >
                            Load Example
                        </Button>
                    </div>

                    {/* Input Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center justify-between">
                            <span className="font-semibold text-base">Your Input</span>
                            <span className="text-xs text-muted-foreground">
                                {inputText.length} characters
                            </span>
                        </label>
                        <div className="relative">
                            <Textarea
                                value={inputText}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder="Enter any URL or text here... (e.g., https://example.com/search?q=hello world)"
                                className="min-h-[100px] sm:min-h-[80px] font-mono text-sm resize-y pr-20 pb-10"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                                <Button
                                    onClick={handlePaste}
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                    title="Paste from clipboard"
                                >
                                    <Clipboard className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={handleCopyInput}
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                    disabled={!inputText}
                                    title={copiedInput ? "Copied!" : "Copy input"}
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="absolute bottom-2 right-2">
                                <Button
                                    onClick={handleClear}
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 hover:bg-destructive/10"
                                    disabled={!inputText}
                                    title="Clear all"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Encoded Output */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center justify-between">
                                <span className="font-semibold text-base text-green-600 dark:text-green-400">Encoded (Safe for URLs)</span>
                                <span className="text-xs text-muted-foreground">
                                    {encodedText.length} chars
                                </span>
                            </label>
                            <div className="relative">
                                <Textarea
                                    value={encodedText}
                                    readOnly
                                    placeholder="Encoded version will appear here..."
                                    className="min-h-[120px] sm:min-h-[120px] font-mono text-sm bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 resize-y pr-12"
                                />
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <Button
                                        onClick={handleCopyEncoded}
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        disabled={!encodedText || encodedText.startsWith('Error')}
                                        title={copiedEncoded ? "Copied!" : "Copy encoded"}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <Button
                                onClick={useEncoded}
                                size="sm"
                                variant="outline"
                                className="w-full text-xs"
                                disabled={!encodedText || encodedText.startsWith('Error')}
                            >
                                Use as Input ↑
                            </Button>
                        </div>

                        {/* Decoded Output */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center justify-between">
                                <span className="font-semibold text-base text-blue-600 dark:text-blue-400">Decoded (Human Readable)</span>
                                <span className="text-xs text-muted-foreground">
                                    {decodedText.length} chars
                                </span>
                            </label>
                            <div className="relative">
                                <Textarea
                                    value={decodedText}
                                    readOnly
                                    placeholder="Decoded version will appear here..."
                                    className="min-h-[120px] sm:min-h-[120px] font-mono text-sm bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 resize-y pr-12"
                                />
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <Button
                                        onClick={handleCopyDecoded}
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        disabled={!decodedText || decodedText.startsWith('Error')}
                                        title={copiedDecoded ? "Copied!" : "Copy decoded"}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <Button
                                onClick={useDecoded}
                                size="sm"
                                variant="outline"
                                className="w-full text-xs"
                                disabled={!decodedText || decodedText.startsWith('Error')}
                            >
                                Use as Input ↑
                            </Button>
                        </div>
                    </div>

                    {/* Information Section */}
                    <Card className="bg-muted/30">
                        <CardContent className="pt-6">
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">
                                How It Works
                            </h3>
                            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                                <p>
                                    This tool automatically shows you <strong>both versions</strong> of your URL in real-time:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li><strong className="text-green-600 dark:text-green-400">Encoded</strong> - Safe for URLs, query parameters, and APIs (spaces become %20, etc.)</li>
                                    <li><strong className="text-blue-600 dark:text-blue-400">Decoded</strong> - Human-readable format with actual characters</li>
                                </ul>
                                <p className="mt-3">
                                    <strong>Pro tip:</strong> Click "Use as Input ↑" under any result to continue encoding/decoding that value!
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Tips */}
                    <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="pt-6">
                            <h3 className="font-semibold mb-3 text-sm sm:text-base flex items-center gap-2">
                                Quick Tips
                            </h3>
                            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <span>Type or paste any URL - see both versions instantly</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <span>Use the copy buttons to quickly grab encoded or decoded results</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <span>Click "Use as Input" to chain multiple encoding/decoding operations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <span>Learn more in our comprehensive <a href="/blog/url-encoding-decoding-guide" className="text-primary hover:underline font-medium">URL Encoding Guide</a></span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
