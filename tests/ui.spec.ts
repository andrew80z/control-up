import { test } from '../fixtures';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { TestUsers } from '../data/users.data';



test.describe('UI Tests - SauceDemo', () => {

    test('Scenario 1: Verify Inventory Items', async ({ loginPage, inventoryPage }) => {
        const expectedNumber = 6;

        await test.step('Navigate and login to the page', async () => {
            await loginPage.navigate();
            await loginPage.login(TestUsers.STANDARD_USER.username, TestUsers.STANDARD_USER.password);
        });

        await test.step(`Verify inventory page displays exactly 6 items ${expectedNumber}`, async () => {
            const itemCount = await inventoryPage.getTotalProductCount();
            expect(itemCount).toBe(expectedNumber);
            expect(itemCount).toBeGreaterThan(0); // Additional safety check
        });
    });


    test('Scenario 2: Add Item to Cart @ui-tests', async ({ inventoryPage, loginPage }) => {

        const addItemAmount = 5;
        const expectedNumber = 5;

        await test.step('Navigate and login', async () => {
            await loginPage.navigate();
            await loginPage.login(TestUsers.STANDARD_USER.username, TestUsers.STANDARD_USER.password);
        });
        await test.step('Add first inventory item to cart', async () => {
            await inventoryPage.additemToCart(addItemAmount);
        });
        await test.step(`Verify cart badge displays number ${expectedNumber}`, async () => {
            const cartCount = await inventoryPage.getCartItemCount();
            expect(cartCount).toBe(expectedNumber);
        });
    });
});
