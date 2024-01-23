import { chromium, webkit, firefox, Browser, Page } from 'playwright';

async function runTest(browserType: typeof chromium | typeof firefox | typeof webkit) {
    let browser: Browser | null = null;

    try {
        browser = await chromium.launch({ headless: false });
        const page: Page = await browser.newPage();

        await page.goto('https://www.douglas.de/de');

        const cookieConsentSelector = 'div[role="dialog"]';
        const cookieAcceptAll = 'button[class*="accept-all"]';
        const parfumLinkSelector = '(//*[contains(text(), "PARFUM")])[1]';

        await page.waitForSelector(cookieConsentSelector);
        await page.click(cookieAcceptAll);


        await page.waitForSelector(parfumLinkSelector);
        await page.click(parfumLinkSelector);

    } catch (error) {
        console.error('An error occurred during the test:', error);
    } finally {
        await browser?.close();
    }
}

async function runTestsOnAllBrowsers() {
    await runTest(chromium);
    await runTest(firefox);
    await runTest(webkit);
}

runTestsOnAllBrowsers();


// Incorporate a try-catch block for better error handling. This will allow you to handle exceptions that might occur during test execution gracefully.

// Make sure the browser closes even if the test fails, using a finally block.

// Instead of using waitForSelector followed by a click, you can use click with a waiting parameter to make the code more compact.

// Use more specific selectors, if possible, to increase the reliability of the test.



interface Product {
    Marke: string;
    Produktart: string;
    GeschenkFur: string;
    FurWen: string;
    Sale: boolean;
    Limitiert: boolean;
}

function filterProducts(products: Product[], filter: Partial<Product>): Product[] {
    return products.filter(product => {
        return Object.entries(filter).every(([key, value]) => {
            const productValue = product[key as keyof Product];
            return value === undefined || productValue === value;
        });
    });
}


const products: Product[] = [
    { Marke: "Marke1", Produktart: "Type1", GeschenkFur: "Person1", FurWen: "Everyone", Sale: false, Limitiert: true },
    { Marke: "Marke2", Produktart: "Type2", GeschenkFur: "Person2", FurWen: "Adults", Sale: true, Limitiert: false },
];

const filter: Partial<Product> = { Sale: true, Limitiert: false };

const filteredProducts = filterProducts(products, filter);

console.log(filteredProducts);

// In this code, we create a filterProducts function that takes an array of products and a filter, and then returns only
// those products that match the filter's criteria. You can add more test products and change the filter to test
// different scenarios.

