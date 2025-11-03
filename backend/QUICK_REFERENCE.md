# 🎯 Quick Reference Card

## ⚡ Lệnh nhanh

```bash
# Test nhanh (với data hiện tại)
./test-all-endpoints.sh

# Test đầy đủ (reset DB + seed + test)
./run-full-test.sh

# Chỉ setup database
./setup-test-db.sh

# Test và lưu log
./test-all-endpoints.sh | tee test-results.log
```

## 📊 Test Results

```
✓ PASS - Green   ← Test thành công
✗ FAIL - Red     ← Test thất bại (có response)
```

## 🔑 Default Credentials

```
Customer: customer@example.com / password123
Admin:    admin@example.com / admin123
```

## 📁 Files

| File                      | Purpose                     |
| ------------------------- | --------------------------- |
| `test-all-endpoints.sh`   | Main test script (33 tests) |
| `setup-test-db.sh`        | Reset & seed database       |
| `run-full-test.sh`        | Complete workflow           |
| `TEST_GUIDE.md`           | Detailed guide              |
| `API_TESTING_COMPLETE.md` | Full documentation          |
| `TESTING_SUMMARY.md`      | Summary overview            |

## 🎯 33 Tests Coverage

- 🔐 Auth (4): Register, Login, Refresh, Logout
- 👤 Users (3): Profile, Update, Password
- 📍 Address (4): CRUD operations
- 🏷️ Brands (4): List, Get, Create, Search
- 📂 Categories (2): List, Get
- 📦 Products (5): List, Get, Filter, Sort
- 🛒 Cart (3): Get, Add, Update
- 📋 Orders (3): List, Create, Get
- 👔 Admin (3): Dashboard, Users, Orders
- 🔒 Security (2): Logout, Blacklist

## 🛠️ Troubleshooting

| Problem               | Solution                  |
| --------------------- | ------------------------- |
| Server not responding | `npm start`               |
| jq not found          | `sudo apt-get install jq` |
| Permission denied     | `chmod +x *.sh`           |
| Many tests fail       | `./setup-test-db.sh`      |
| Invalid password      | Check seeders             |

## 📊 Expected Results

### With seeded data:

```
Total:  33
Passed: 30-33 ✅
Failed: 0-3 ❌
```

### Without data:

```
Total:  33
Passed: 15-20 ✅
Failed: 13-18 ❌
```

## 🎓 Best Practices

1. ✅ Reset DB trước khi test
2. ✅ Check server đang chạy
3. ✅ Đọc response khi fail
4. ✅ Run tests sau mỗi change
5. ✅ Keep credentials secure

## 📚 More Info

- Read `TEST_GUIDE.md` for details
- Read `API_TESTING_COMPLETE.md` for full docs
- Import `docs/project/script.json` to Insomnia

---

**Quick help:** `cat TEST_GUIDE.md`
