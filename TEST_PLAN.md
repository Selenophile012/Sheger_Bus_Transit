# Sheger Transit - Manual Test Plan

## 1. Load Routes

- Open the application with Live Server.
- Confirm the loading message appears briefly.
- Confirm route cards appear after loading.

Expected result:
PASS


## 2. Search Routes

- Type "Bole" into the search box.
- Confirm matching routes are displayed.
- Type "Megenagna".
- Confirm matching routes are displayed.

Expected result:
PASS


## 3. Search With No Results

- Search for "London".

Expected result:

- "No routes found" appears.
- The page does not become blank.
- No console error appears.

Expected result:
PASS


## 4. Save Favourite

- Click "Save Favourite" on a route.
- Confirm the route appears in Favourite Routes.

Expected result:
PASS


## 5. Remove Favourite

- Click "Remove" beside a favourite route.
- Confirm the route disappears.

Expected result:
PASS


## 6. Favourite Persistence

- Save a route.
- Refresh the browser.

Expected result:

- The favourite route is still displayed.

Expected result:
PASS


## 7. Invalid Booking Phone

- Enter a name.
- Enter `12345`.
- Select a route.
- Submit the form.

Expected result:

- Booking is blocked.
- Clear error appears.

Expected result:
PASS


## 8. Empty Booking Name

- Leave the name field empty.
- Enter a valid Ethiopian phone.
- Select a route.
- Submit.

Expected result:

- Booking is blocked.
- "Please enter your name." appears.

Expected result:
PASS


## 9. No Route Selected

- Enter a valid name.
- Enter a valid Ethiopian phone.
- Do not select a route.
- Submit.

Expected result:

- Booking is blocked.
- "Please select a route." appears.

Expected result:
PASS


## 10. Valid Booking

- Enter a valid name.
- Enter `0912345678`.
- Select a route.
- Submit.

Expected result:

- Booking confirmation appears.
- Form is reset.
- Booking object appears in the console.
- No console error appears.

Expected result:
PASS


## 11. Alternative Valid Phone

Test:

+251912345678

Expected result:
Accepted.


## 12. Invalid Phone

Test:

123456789

Expected result:
Rejected.


## 13. Keyboard Navigation

- Use Tab through the page.
- Confirm search can be focused.
- Confirm favourite buttons can be focused.
- Confirm booking fields can be focused.
- Confirm Book Trip can be focused.

Expected result:
PASS


## 14. Mobile Layout

- Open DevTools.
- Switch to a mobile viewport.

Expected result:

- Content remains readable.
- Route cards reflow.
- No horizontal scrolling occurs.

Expected result:
PASS


## 15. Broken Data File

- Temporarily change ROUTES_URL in app.js.
- Reload.

Expected result:

- Error message appears.
- Application does not crash.

Expected result:
PASS


## Final Checklist

- [ ] Routes load
- [ ] Search works
- [ ] Empty search state works
- [ ] Favourites work
- [ ] Favourite removal works
- [ ] Favourites persist after reload
- [ ] Booking works
- [ ] Name validation works
- [ ] Phone validation works
- [ ] Route validation works
- [ ] Confirmation works
- [ ] Loading state works
- [ ] Error state works
- [ ] Mobile layout works
- [ ] Keyboard navigation works
- [ ] No console errors