import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { TestUsers } from '../data/users.data';

test.describe('UI Tests - SauceDemo', () => {

    test('Scenario 1: Verify Inventory Items', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const expectedNumber = 6;

        await test.step('Navigate and login to the page', async () => {
            await loginPage.navigate();
            await loginPage.login(TestUsers.STANDARD_USER.username, TestUsers.STANDARD_USER.password);
        });

        await test.step(`Verify inventory page displays exactly 6 items ${expectedNumber}`, async () => {
            const itemCount = await inventoryPage.getTotalProductCount();
            expect(itemCount).toBe(expectedNumber);
        });
    });


    test('Scenario 2: Add Item to Cart @ui-tests', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const expectedNumber = 1;

        await test.step('Navigate and login', async () => {
            await loginPage.navigate();
            await loginPage.login(TestUsers.STANDARD_USER.username, TestUsers.STANDARD_USER.password);
        });
        await test.step('Add first inventory item to cart', async () => {
            await inventoryPage.addFirstItemToCart();
        });
        await test.step(`Verify cart badge displays number ${expectedNumber}`, async () => {
            const cartCount = await inventoryPage.getCartItemCount();
            expect(cartCount).toBe(expectedNumber);
        });
    });
});
